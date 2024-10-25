// WeatherDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faWind, faCloudSun, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [alertCities, setAlertCities] = useState([]);

  // Fetch recent data without adding new entries
  const fetchRecentData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/weather');
      const data = response.data;
      setWeatherData(data);
      checkAlertThreshold(data);
    } catch (error) {
      console.error('Error fetching recent data:', error);
    }
  };

  // Refresh data by updating temperatures in the backend
  const refreshData = async () => {
    try {
      await axios.get('http://localhost:5000/api/weather/refresh');
      fetchRecentData(); // Refresh UI after backend data updates
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  // Identify cities above temperature threshold
  const checkAlertThreshold = (data) => {
    const citiesAboveThreshold = data
      .filter((city) => city.temp > 35)
      .map((city) => city.city);

    setAlertCities(citiesAboveThreshold);
  };

  useEffect(() => {
    fetchRecentData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
        Weather Dashboard
      </h1>

      {/* Red Alert Messages */}
      {alertCities.length > 0 && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p className="font-bold">Alert: High Temperature</p>
          <p>
            The following cities have temperatures above 35°C:{' '}
            <span className="font-semibold">
              {alertCities.join(', ')}
            </span>
          </p>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={fetchRecentData}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
        >
          Fetch Recent Data
        </button>
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faSyncAlt} />
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {weatherData.map((weather, index) => (
          <div
            key={index}
            className={`p-6 bg-white shadow-lg rounded-lg transform transition duration-500 hover:scale-105 ${
              weather.temp > 35 ? 'border border-red-500' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h2
                className={`text-2xl font-semibold ${
                  weather.temp > 35 ? 'text-red-600' : 'text-gray-800'
                }`}
              >
                {weather.city}
              </h2>
              <FontAwesomeIcon
                icon={faCloudSun}
                className="text-yellow-500 text-3xl"
              />
            </div>
            <div className="text-gray-600">
              <p className="flex items-center">
                <FontAwesomeIcon icon={faThermometerHalf} className="mr-2" />
                Temperature: {weather.temp.toFixed(2)}°C
              </p>
              <p className="flex items-center mt-2">
                <FontAwesomeIcon icon={faWind} className="mr-2" />
                Feels Like: {weather.feels_like.toFixed(2)}°C
              </p>
              <p className="mt-2">
                <span className="text-gray-700 font-medium">Condition:</span>{' '}
                {weather.main}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;
