import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=90ccaf76a1c136daef345d47598c58e1&units=imperial`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        const dailyForecasts = summarizeForecast(response.data.list);
        setForecast(dailyForecasts);
        console.log(dailyForecasts);
      }).catch((error) => {
        console.error("Error fetching the weather data: ", error);
      });
      setLocation('');
    }
  };

  const summarizeForecast = (data) => {
    const dailyData = [];
    const tempData = {};

    data.forEach(entry => {
      const date = new Date(entry.dt_txt).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

      if (!tempData[date]) {
        tempData[date] = {
          temp: [],
          feels_like: [],
          humidity: [],
          wind: [],
          description: entry.weather[0].main,
        };
      }

      tempData[date].temp.push(entry.main.temp);
      tempData[date].feels_like.push(entry.main.feels_like);
      tempData[date].humidity.push(entry.main.humidity);
      tempData[date].wind.push(entry.wind.speed);
    });

    for (const [day, values] of Object.entries(tempData)) {
      dailyData.push({
        day,
        temp: average(values.temp),
        feels_like: average(values.feels_like),
        humidity: average(values.humidity),
        wind: average(values.wind),
        description: values.description,
      });
    }

    return dailyData.slice(0, 5);
  };

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        {forecast.map((day, index) => (
          <div key={index} className="day-forecast">
            <div className="location">
              <p>{day.day}</p>
            </div>
            <div className="temp">
              <h1>{day.temp.toFixed()}°F</h1>
            </div>
            <div className="description">
              <p>{day.description}</p>
            </div>
            <div className="feels">
              <p className="bold">{day.feels_like.toFixed()}°F</p>
              <p>Feels like</p>
            </div>
            <div className="humidity">
              <p className="bold">{day.humidity.toFixed()}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{day.wind.toFixed()} mph</p>
              <p>Wind Speed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
