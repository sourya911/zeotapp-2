const mongoose = require('mongoose');

// Schema for individual weather updates
const WeatherSchema = new mongoose.Schema({
  city: String,
  date: { type: Date, default: Date.now },
  temp: Number,
  feels_like: Number,
  main: String,
});

// Schema to store daily roll-up summaries
const DailySummarySchema = new mongoose.Schema({
  date: { type: Date, unique: true },
  avg_temp: Number,
  max_temp: Number,
  min_temp: Number,
  dominant_condition: String,
});

const Weather = mongoose.model('Weather', WeatherSchema);
const DailySummary = mongoose.model('DailySummary', DailySummarySchema);

module.exports = { Weather, DailySummary };
