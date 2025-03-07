from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="itera",
    version="0.6.0",
    author="Teddy Oweh",
    author_email="teddy@teddyoweh.net",
    description="A beautiful git changelog generator with semantic search capabilities",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/teddyoweh/itera",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
    python_requires=">=3.8",
    install_requires=[
        "click>=8.0.0",
        "rich>=10.0.0",
        "GitPython>=3.1.0",
        "openai>=1.0.0",
        "pydantic>=2.0.0",
        "faiss-cpu>=1.7.0",
        "networkx>=2.6.0",
        "matplotlib>=3.4.0",
    ],
    entry_points={
        "console_scripts": [
            "itera=itera_lib.cli:cli",
        ],
    },
    license="MIT",
) 