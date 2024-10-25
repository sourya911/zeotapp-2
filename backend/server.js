const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const { Weather, DailySummary } = require('./models/Weather');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Cities to fetch weather data
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Fetch data for a single city from OpenWeatherMap
const fetchWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`;
  const response = await axios.get(url);
  const data = response.data;
  return {
    city,
    temp: data.main.temp - 273.15,
    feels_like: data.main.feels_like - 273.15,
    main: data.weather[0].main,
  };
};

// Fetch and store weather data for all cities
const fetchAndSaveWeatherData = async () => {
  const weatherData = await Promise.all(cities.map(city => fetchWeatherData(city)));
  weatherData.forEach(async (data) => {
    const weather = new Weather(data);
    await weather.save();
  });
};

// Calculate and store daily summary for each city
const calculateDailySummary = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const summaryData = await Weather.aggregate([
    { $match: { date: { $gte: today } } },
    {
      $group: {
        _id: "$city",
        avg_temp: { $avg: "$temp" },
        max_temp: { $max: "$temp" },
        min_temp: { $min: "$temp" },
        dominant_condition: { $first: "$main" },
      },
    },
  ]);

  summaryData.forEach(async (data) => {
    await DailySummary.updateOne(
      { date: today, city: data._id },
      {
        date: today,
        avg_temp: data.avg_temp,
        max_temp: data.max_temp,
        min_temp: data.min_temp,
        dominant_condition: data.dominant_condition,
      },
      { upsert: true }
    );
  });
};

// Check for alerts when temperature exceeds 35°C
const checkAlertThreshold = async () => {
  const recentData = await Weather.find().sort({ date: -1 }).limit(10);
  recentData.forEach((weather) => {
    if (weather.temp > 35) {
      console.log(`Alert: Temperature in ${weather.city} exceeds threshold!`);
    }
  });
};

// API endpoints
app.get('/api/weather', async (req, res) => {
  const recentWeather = await Weather.find().sort({ date: -1 }).limit(10);
  res.json(recentWeather);
});



app.get('/api/weather/historical/:date', async (req, res) => {
  const date = new Date(req.params.date);
  const historicalData = await Weather.find({ date });
  res.json(historicalData);
});

app.get('/api/weather/summary', async (req, res) => {
  const summaries = await DailySummary.find();
  res.json(summaries);
});

app.get('/api/weather/refresh', async (req, res) => {
  const recentWeather = await Weather.find().sort({ date: -1 }).limit(10);
  res.json(recentWeather);
});

// Schedule updates and calculations
setInterval(fetchAndSaveWeatherData, 5 * 60 * 1000); // Update weather every 5 minutes
setInterval(calculateDailySummary, 24 * 60 * 60 * 1000); // Calculate daily summaries at midnight
setInterval(checkAlertThreshold, 5 * 60 * 1000); // Check for alerts every 5 minutes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
