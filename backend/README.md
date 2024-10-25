# Weather Monitoring System - Backend

## Overview
This backend service is responsible for fetching, storing, and processing weather data from the OpenWeatherMap API. It manages data storage, calculates daily summaries, and raises alerts for temperature thresholds.

## Features
- Fetch real-time weather data for selected cities.
- Store and aggregate daily temperature data in MongoDB.
- Generate daily summaries for each city.
- Check temperature thresholds and issue alerts.
- Expose API endpoints for frontend consumption.

## Prerequisites
- Node.js and npm installed
- MongoDB database
- OpenWeatherMap API key

## Installation
1. Clone the repository and navigate to the `/backend` directory.
2. Install dependencies:
   ```bash
   npm install
