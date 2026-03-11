# Rabbit AI - Sales Insight Automator

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Docker](https://img.shields.io/badge/docker-ready-brightgreen)
![CI/CD](https://img.shields.io/badge/CI-CD-GitHub%20Actions-purple)

Transform sales data into AI-powered executive summaries delivered straight to your inbox.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

---

## Overview
Sales Insight Automator is a full-stack application that allows sales teams to upload CSV/Excel files and receive AI-generated professional summaries via email.

---

## Features
- 📤 Upload CSV/Excel files
- 🤖 AI-powered analysis using Groq LLM
- 📧 Email delivery of summaries
- 🔒 Rate limiting & input validation
- 🐳 Docker support
- 🚀 CI/CD with GitHub Actions

---

## Tech Stack
**Frontend:** React, Vite, Tailwind CSS  
**Backend:** Node.js, Express  
**AI:** Groq LLM (Llama 3.3)  
**DevOps:** Docker, GitHub Actions

---

## Quick Start

### Using Docker
```bash
# Clone repository
git clone <your-repo-url>
cd sales-insight-automator

# Set up environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit backend/.env with your API keys
# Then run:
docker-compose up --build