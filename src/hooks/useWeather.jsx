import { useState } from 'react';
import axios from 'axios';

export default function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(data);
    } catch (err) {
      setError("City not found or API error.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );
      const daily = res.data.list.filter((_, idx) => idx % 8 === 0);
      const mapped = daily.map((item) => ({
        day: new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short' }),
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        condition: item.weather[0].main,
      }));
      setForecastData(mapped);
    } catch (err) {
      console.error("Forecast error", err);
    }
  };

  return { weatherData, fetchWeather, loading, error, forecastData, fetchForecast };
}