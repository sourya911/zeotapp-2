# Weather Monitoring System

A real-time weather monitoring system that fetches and displays weather data for multiple cities. Built with React for the frontend, Node.js/Express for the backend, MongoDB as the database, and styled using Tailwind CSS.

## Table of Contents
- [Features](#features)
- [Dockerization](#dockerization)
  - [Docker Containers](#docker-containers)
  - [Setting Up the Application Using Docker](#setting-up-the-application-using-docker)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Environment Variables](#environment-variables)


## Features
- Displays real-time weather data
- Sends alerts for temperatures above 35°C
- Refreshes weather data periodically

## Dockerization
- docker build -t btech-frontend .
- docker run -p 3000:3000 btech-frontend

## Prerequisites
- Node.js and npm installed
- Docker and Docker Compose installed

## Setup and Installation
- Clone the Repository
- git clone https://github.com/sourya911/zeotApp-2
- install dependencies
- npm install


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
```
## Usage
- View real-time weather data for cities and receive alerts if the temperature exceeds 35°C



# Environment Variables
## You may need to configure environment variables for the backend API endpoint in your .env file:
- REACT_APP_BACKEND_API=http://localhost:5000/api/weather
- PORT=5000
- MONGO_URI=mongodb+srv://user1c:T5CkN5eA9LSXPevi@cluster0.nfnw30m.mongodb.net/weatherMonitoring?retryWrites=true&w=majority&appName=Cluster0
- OPENWEATHER_API_KEY=cac5cec0ab003de7178e189e35bfb31c






