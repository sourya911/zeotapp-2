# Weather Monitoring System

A real-time weather monitoring system that fetches and displays weather data for multiple cities. Built with React for the frontend, Node.js/Express for the backend, MongoDB as the database, and styled using Tailwind CSS.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Dockerization](#dockerization)
  - [Docker Containers](#docker-containers)
  - [Setting Up the Application Using Docker](#setting-up-the-application-using-docker)
- [Usage](#usage)
- [Environment Variables](#environment-variables)


## Features
- Displays real-time weather data
- Sends alerts for temperatures above 35°C
- Refreshes weather data periodically

## Docker Compose:

- Backend Container: btech-backend will run on http://localhost:5000
- Frontend Container: btech-frontend will run on http://localhost:3000


## Project Structure
```plaintext
weather-monitoring-system/
├── frontend/                        # React frontend
│   ├── src/                         # React source files
│   └── Dockerfile                   # Dockerfile for frontend
├── backend/                         # Express backend
│   ├── src/                         # Express source files
│   └── Dockerfile                   # Dockerfile for backend
├── docker-compose.yml               # Docker Compose configuration
├── README.md                        # Main project documentation
└── .gitignore                       # Ignored files for version control
