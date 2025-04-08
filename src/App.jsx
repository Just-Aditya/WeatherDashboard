import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import ForecastCard from './components/ForecastCard';
import useWeather from './hooks/useWeather';
import { motion } from 'framer-motion';
import { RefreshCw, Sun, Moon } from 'lucide-react';

export default function App() {
  const {
    weatherData,
    fetchWeather,
    loading,
    error,
    forecastData,
    fetchForecast,
  } = useWeather();

  const [currentCity, setCurrentCity] = useState('');
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('weatherHistory')) || [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('weatherHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleSearch = async (city) => {
    if (!city.trim()) return;
    await fetchWeather(city);
    await fetchForecast(city);
    setCurrentCity(city);
    setHistory((prev) => {
      const updated = [city, ...prev.filter((c) => c !== city)];
      return updated.slice(0, 5);
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-primary to-secondary text-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">🌤️ Weather Dashboard</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-white" />
          ) : (
            <Moon className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
        <div className="md:w-1/3 flex flex-col">
          <div className="mb-4">
            <SearchBar onSearch={handleSearch} />
            {currentCity && !loading && (
              <button
                onClick={() => handleSearch(currentCity)}
                className="flex items-center mt-2 text-sm text-white hover:text-sky-300 transition"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Refresh
              </button>
            )}
          </div>

          {history.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold mb-1 text-white">Recent:</p>
              <div className="flex flex-wrap gap-2">
                {history.map((city, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearch(city)}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition text-white"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {loading && (
            <div className="md:hidden flex justify-center my-4">
              <Loader />
            </div>
          )}
        </div>

        <div className="md:w-2/3 flex flex-col h-full overflow-hidden">
          {loading && (
            <div className="hidden md:flex justify-center items-center h-full">
              <Loader />
            </div>
          )}

          {weatherData && !loading && (
            <div className="flex flex-col h-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <WeatherCard data={weatherData} />
              </motion.div>

              {forecastData.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex-1 overflow-auto"
                >
                  <h3 className="text-base font-bold mb-2">Forecast</h3>
                  <ForecastCard forecast={forecastData} />
                </motion.div>
              )}
            </div>
          )}

          {!weatherData && !loading && !error && (
            <div className="flex items-center justify-center h-full text-white/70">
              <p>Search for a city to view weather information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
