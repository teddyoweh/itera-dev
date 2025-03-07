"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, X, Loader, ChevronRight, GitCommit, AlertCircle, Clock } from 'lucide-react';
import axios from 'axios';
import Markdown from 'react-markdown';
import './AiChat.css';

const API_BASE_URL = 'http://localhost:8000';

const initialMessage = {
  id: 1,
  type: 'ai',
  hash: '',
  content: "Let me know what you need to tracking.",
  timestamp: new Date().toISOString()
};

const fadeInUp = {
  initial: { opacity: 0, y: 10, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const ChatMessage = ({ message, isLatest }) => {
  const isAi = message.type === 'ai';
  const timestamp = typeof message.timestamp === 'string' 
    ? new Date(message.timestamp)
    : message.timestamp;
  
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      className={`chat-message ${isAi ? 'ai' : 'user'} ${isLatest ? 'latest' : ''}`}
    >
      <motion.div 
        className="message-avatar"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isAi ? <Bot size={16} /> : <User size={16} />}
      </motion.div>
      <motion.div 
        className="message-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="message-text">
          <Markdown>{message.content}</Markdown>
          </div>
        
        {isAi && message.changeDetails && (
          <div className="change-details">
            <div className="detail-section">
              <div className="section-title">
                <GitCommit size={14} />
                {/* Changed Files */}
                <span style={{ opacity: 0.5 }}>{message.hash}</span>
              </div>
              <div className="section-content">
                <div className="file-tags">
                  {message.changeDetails.files.map((file, index) => (
                    <div key={index} className={`file-tag ${file.type}`}>
                      <span>{file.path}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="detail-section">
              <div className="section-title">
                <AlertCircle size={14} />
                Impact Analysis
              </div>
              <div className="impact-tags">
                {message.changeDetails.impact
                  .filter(tag => tag !== null)
                  .map((tag, index) => (
                    <div key={index} className="impact-tag">
                      <span>{tag.label}</span>
                    </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <div className="section-title">
                <Clock size={14} />
                Timeline
              </div>
              <div className="timeline-info">
                <div className="timeline-item">
                  <GitCommit size={12} />
                  {message.changeDetails.timeline.committed}
                </div>
                <div className="timeline-item">
                  <User size={12} />
                  {message.changeDetails.timeline.author}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="message-timestamp">
          {timestamp.toLocaleTimeString('en-US', { 
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

const TypingIndicator = () => (
  <motion.div 
    className="typing-indicator"
    initial={{ opacity: 0, y: 10, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.9 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      animate={{ 
        rotate: 360,
        transition: { duration: 2, repeat: Infinity, ease: "linear" }
      }}
    >
      <Loader size={16} />
    </motion.div>
    <motion.span
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      AI is thinking...
    </motion.span>
  </motion.div>
);

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    
    const mainContainer = document.querySelector('.changelog-container');
    if (mainContainer) {
      if (isOpen) {
        mainContainer.classList.add('chat-open');
      } else {
        mainContainer.classList.remove('chat-open');
      }
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/query`, {
        query: inputValue
      });
      
      const data = response.data;
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        hash: data.hash,
        content: data.content,
        timestamp: data.timestamp,
        changeDetails: {
          ...data.changeDetails,
          impact: data.changeDetails?.impact?.filter(tag => tag !== null) || []
        }
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'ai',
        hash: '',
        content: "I apologize, but I encountered an error while processing your request. Please try again.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.div
        className="chat-toggle"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={false}
        animate={{
          x: isOpen ? 100 : 0,
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 0.8 : 1
        }}
      >
        <ChevronRight size={20} />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-container"
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <motion.div 
              className="chat-header"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="chat-title">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Bot size={20} />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Itera got you covered :)
                </motion.span>
              </div>
              <motion.button 
                className="close-button"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            </motion.div>

            <motion.div 
              className="chat-messages"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message}
                    isLatest={index === messages.length - 1}
                  />
                ))}
                {isTyping && <TypingIndicator />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </motion.div>

            <motion.form 
              onSubmit={handleSubmit} 
              className="chat-input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about your codebase..."
                autoComplete="off"
                whileFocus={{ scale: 1.01 }}
              />
              <motion.button
                type="submit"
                disabled={!inputValue.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={false}
                animate={{
                  scale: inputValue.trim() ? 1 : 0.95,
                  opacity: inputValue.trim() ? 1 : 0.7
                }}
              >
                <Send size={16} />
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 