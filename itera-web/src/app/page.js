"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import './style.scss';
import { motion, AnimatePresence } from "framer-motion";
import { commitStore } from "@/app/data";
import { 
  ChevronDown, 
  ChevronRight, 
  Calendar, 
  Tag, 
  Filter, 
  Search, 
  Moon, 
  Sun, 
  GitCommit, 
  Plus, 
  Minus, 
  Edit, 
  Clock, 
  User, 
  X, 
  BarChart4,
  GitBranch,
  GitMerge,
  GitPullRequest,
  FileCode,
  MessageSquare
} from "lucide-react";
import Markdown from "react-markdown";
import AiChat from './components/AiChat';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { 
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1]
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
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
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const CommitCard = ({ commit, expanded, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingType, setProcessingType] = useState(null);
  const processingTimeout = useRef(null);
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const simulateProcessing = (type) => {
    setProcessingType(type);
    setIsProcessing(true);
    
    if (processingTimeout.current) {
      clearTimeout(processingTimeout.current);
    }
    
    processingTimeout.current = setTimeout(() => {
      setIsProcessing(false);
      setProcessingType(null);
    }, Math.random() * 1000 + 500);
  };

  useEffect(() => {
    return () => {
      if (processingTimeout.current) {
        clearTimeout(processingTimeout.current);
      }
    };
  }, []);
  
  return (
    <motion.div
      className="commit-card"
      variants={cardVariants}
      layout="position"
      layoutId={commit.commit_hash}
      onHoverStart={() => {
        // setIsHovered(true);
        // simulateProcessing('hover');
      }}
      onHoverEnd={() => setIsHovered(false)}
      // whileHover={{
      //   y: -4,
      //   transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      // }}
      // animate={{
      //   scale: isProcessing ? 1.01 : 1,
      //   transition: { duration: 0.3 }
      // }}
    >
      <motion.div 
        className="commit-timeline-dot"
        initial={false}
        animate={{
          scale: isHovered ? 1.2 : 1,
          backgroundColor: isProcessing ? "#0052FF" : isHovered ? "#0052FF" : "transparent",
          borderColor: isProcessing ? "#0052FF" : isHovered ? "#0052FF" : "rgba(0, 82, 255, 0.2)"
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      
      <motion.div 
        className="processing-indicator"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isProcessing ? 1 : 0,
          transition: { duration: 0.2 }
        }}
      >
        <motion.div 
          className="processing-dot"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
     
      </motion.div>
      
      <div className="commit-header">
        <div className="commit-title-section">
          <motion.div 
            className="commit-type-indicator"
            animate={{
              scale: isHovered ? 1.1 : 1,
              backgroundColor: isProcessing 
                ? "rgba(0, 82, 255, 0.15)" 
                : isHovered 
                  ? "rgba(0, 82, 255, 0.1)" 
                  : "rgba(0, 82, 255, 0.06)"
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ 
                scale: isProcessing ? [1, 1.1, 1] : isHovered ? 1.1 : 1,
                rotate: isProcessing ? [0, 180, 360] : 0
              }}
              transition={{ 
                duration: isProcessing ? 2 : 0.3,
                ease: [0.22, 1, 0.36, 1],
                repeat: isProcessing ? Infinity : 0
              }}
            >
              {commit.type === 'feature' && <Plus size={16} />}
              {commit.type === 'fix' && <GitMerge size={16} />}
              {commit.type === 'refactor' && <GitBranch size={16} />}
            </motion.div>
          </motion.div>
          
          <div className="commit-title-content">
            <motion.h3 
              className="commit-title"
             
  
            >
              {commit.message}
            </motion.h3>
            
            <motion.div 
              className="commit-meta"
              animate={{
                opacity: isHovered ? 1 : 0.9,
                x: isProcessing ? 2 : 0
              }}
            >
              <motion.div 
                className="commit-hash"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => simulateProcessing('hash')}
              >
                <GitCommit size={14} />
                <span>{commit.commit_hash}</span>
              </motion.div>
              
              <motion.div 
                className="commit-date"
                animate={{
                  opacity: isProcessing ? 0.7 : 1
                }}
              >
                <Calendar size={14} />
                <span>{commit.human_readable_date}</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
{/*         
        <motion.div 
          className="commit-stats"
          animate={{
            opacity: isHovered ? 1 : 0.8,
            scale: isProcessing ? 1.02 : isHovered ? 1.02 : 1
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="stat-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => simulateProcessing('stats')}
          >
            <FileCode size={14} />
            <span>{commit.stats?.files_changed || 0} files</span>
          </motion.div>
          <motion.div 
            className="stat-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={14} />
            <span className="additions">+{commit.stats?.additions || 0}</span>
          </motion.div>
          <motion.div 
            className="stat-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Minus size={14} />
            <span className="deletions">-{commit.stats?.deletions || 0}</span>
          </motion.div>
        </motion.div> */}
      </div>
      
      <motion.div 
        className="commit-content"
        animate={{ 
          opacity: isHovered ? 1 : 0.95,
          scale: isProcessing ? 1.005 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="commit-author">
          <motion.div 
            className="author-avatar"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isProcessing
                ? "0 4px 16px rgba(0, 82, 255, 0.3)"
                : isHovered 
                  ? "0 4px 12px rgba(0, 82, 255, 0.2)" 
                  : "0 2px 6px rgba(0, 82, 255, 0.1)"
            }}
            onHoverStart={() => simulateProcessing('author')}
          >
            {getInitials(commit.author)}
          </motion.div>
          <motion.div 
            className="author-info"
            animate={{ 
              x: isProcessing ? 4 : isHovered ? 2 : 0,
              opacity: isProcessing ? 0.9 : 1
            }}
          >
            <div className="author-name">{commit.author}</div>
            <div className="author-role">{commit.author_role || 'Contributor'}</div>
          </motion.div>
        </div>
        
        <motion.div 
          className="commit-summary"
          layout
        >
          <motion.div 
            className="blurb"
            animate={{ 
              opacity: isProcessing ? 0.8 : isHovered ? 1 : 0.9,
              x: isProcessing ? 2 : 0
            }}
          >
            {commit.summary.blurb}
          </motion.div>
          <AnimatePresence mode="wait">
            {expanded && (
              <div 
                className="summary-text expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: "auto",
                  transition: {
                    height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.3, delay: 0.1 }
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0,
                  transition: {
                    height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.2 }
                  }
                }}
              >
                <Markdown>{commit.summary.summary}</Markdown>
              </div>
            )}
          </AnimatePresence>
          
          <motion.div 
            className="read-more"
            onClick={() => {
              simulateProcessing('expand');
              onToggle();
            }}
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            {expanded ? 'Read less' : 'Read more'}
            <motion.div
              animate={{ 
                rotate: expanded ? 180 : 0,
                y: expanded ? -1 : 1
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ChevronDown size={16} />
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="commit-footer"
          animate={{ 
            opacity: isHovered ? 1 : 0.95,
            y: isProcessing ? 1 : 0
          }}
        >
          <div className="tags-container">
            {commit.summary.tags.map((tag, tagIndex) => (
              <motion.div 
                key={`${commit.commit_hash}-tag-${tagIndex}`} 
                className="tag"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => simulateProcessing('tag')}
              >
                <Tag size={12} />
                <span>{tag}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="changes-type">
            {commit.summary.changes_type.map((change, changeIndex) => (
              <motion.div 
                key={`${commit.commit_hash}-change-${changeIndex}`} 
                className={`change-badge ${change}`}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => simulateProcessing('change')}
              >
                {change === 'added' && <Plus size={12} />}
                {change === 'modified' && <Edit size={12} />}
                {change === 'deleted' && <Minus size={12} />}
                <span>{change}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function Home() {
  const [commits, setCommits] = useState([]);
  const [filteredCommits, setFilteredCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedSummaries, setExpandedSummaries] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const timelineRef = useRef(null);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const searchableCommits = useMemo(() => {
    return commits.map(commit => ({
      ...commit,
      searchableText: [
        commit.message,
        commit.summary.blurb,
        commit.author,
        ...(commit.summary.tags || [])
      ].join(' ').toLowerCase()
    }));
  }, [commits]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      filterCommits(activeFilter);
      return;
    }

    const term = debouncedSearchTerm.toLowerCase();
    const filtered = searchableCommits.filter(commit => 
      commit.searchableText.includes(term)
    );
    
    setFilteredCommits(filtered);
  }, [debouncedSearchTerm, searchableCommits, activeFilter]);
  
  useEffect(() => {
    console.log('Component mounted, initializing data loading');
    console.log('Initial commitStore:', commitStore);
    console.log('commitStore type:', typeof commitStore);
    console.log('Is Array?', Array.isArray(commitStore));
    
    const timer = setTimeout(() => {
      try {
        if (!commitStore) {
          throw new Error('Commit data is undefined');
        }
        if (!Array.isArray(commitStore)) {
          throw new Error('Commit data is not in the expected format');
        }
        if (commitStore.length === 0) {
          console.warn('Commit store is empty');
        }
        
        console.log('Setting commits from commitStore');
        setCommits(commitStore);
        setFilteredCommits(commitStore);
        setError(null);
      } catch (err) {
        console.error('Error loading commits:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    console.log('Current commits:', commits);
    console.log('Current filteredCommits:', filteredCommits);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [commits, filteredCommits, loading, error]);
  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
  
  const filterCommits = (filter) => {
    setActiveFilter(filter);
    
    if (filter === "all") {
      setFilteredCommits(commits);
      return;
    }
    
    if (filter === "added" || filter === "modified" || filter === "deleted") {
      const filtered = commits.filter(commit => 
        commit.summary.changes_type.includes(filter)
      );
      setFilteredCommits(filtered);
      return;
    }
    
    // Filter by date range (last 7 days, last 30 days)
    if (filter === "recent") {
      const now = new Date();
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      
      const filtered = commits.filter(commit => {
        const commitDate = new Date(commit.date);
        return commitDate >= sevenDaysAgo;
      });
      
      setFilteredCommits(filtered);
    }
  };
  
  const toggleSummary = (commitHash) => {
    setExpandedSummaries(prev => ({
      ...prev,
      [commitHash]: !prev[commitHash]
    }));
  };
  
  const renderSkeletonLoader = () => (
    <motion.div className="commit-card" {...fadeInUp}>
      <div className="loading-skeleton title"></div>
      <div className="loading-skeleton date"></div>
      <div className="loading-skeleton hash"></div>
      <div className="loading-skeleton blurb"></div>
      <div className="loading-skeleton summary"></div>
      <div className="loading-skeleton tags"></div>
    </motion.div>
  );
  
  return (
    <div className="app">
      <div className="changelog-container">
        <motion.div 
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="header-content">
            <h1>Itera</h1>
            <p className="subtitle">Track all changes and updates to your codebase</p>
          </div>
          
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <motion.input 
              type="text" 
              placeholder="Search commits, authors, tags..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
              initial={{ opacity: 0.9 }}
              animate={{ 
                opacity: searchTerm ? 1 : 0.9,
                scale: searchTerm ? 1 : 0.99
              }}
              transition={{
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            />
            {searchTerm && (
              <motion.div 
                className="search-indicator"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <span>{filteredCommits.length} results</span>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div 
            className={`filter-item ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => filterCommits('all')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter size={14} />
            <span>All</span>
          </motion.div>
          
          <motion.div 
            className={`filter-item ${activeFilter === 'added' ? 'active' : ''}`}
            onClick={() => filterCommits('added')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={14} />
            <span>Added</span>
          </motion.div>
          
          <motion.div 
            className={`filter-item ${activeFilter === 'modified' ? 'active' : ''}`}
            onClick={() => filterCommits('modified')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit size={14} />
            <span>Modified</span>
          </motion.div>
          
          <motion.div 
            className={`filter-item ${activeFilter === 'deleted' ? 'active' : ''}`}
            onClick={() => filterCommits('deleted')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Minus size={14} />
            <span>Deleted</span>
          </motion.div>
          
          <motion.div 
            className={`filter-item ${activeFilter === 'recent' ? 'active' : ''}`}
            onClick={() => filterCommits('recent')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Clock size={14} />
            <span>Recent</span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="timeline" 
          ref={timelineRef}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div className="skeleton-container" {...fadeInUp}>
                {Array(5).fill().map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    variants={fadeInUp}
                  >
                    {renderSkeletonLoader()}
                  </motion.div>
                ))}
              </motion.div>
            ) : error ? (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <X size={64} />
                <h3>Error loading commits</h3>
                <p>{error}</p>
                <motion.button 
                  onClick={() => window.location.reload()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Retry
                </motion.button>
              </motion.div>
            ) : filteredCommits.length === 0 ? (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <X size={64} />
                <h3>No commits found</h3>
                <p>Try adjusting your search or filters to find what you're looking for.</p>
                <motion.button 
                  onClick={() => {
                    setSearchTerm("");
                    filterCommits("all");
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear filters
                </motion.button>
              </motion.div>
            ) : (
              <motion.div className="commits-container" variants={staggerContainer}>
                {filteredCommits.map((commit) => (
                  <CommitCard
                    key={commit.commit_hash}
                    commit={commit}
                    expanded={expandedSummaries[commit.commit_hash]}
                    onToggle={() => toggleSummary(commit.commit_hash)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <motion.div 
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>

      <AiChat />
    </div>
  );
}
