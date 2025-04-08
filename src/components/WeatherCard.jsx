import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';

const getWeatherColor = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return 'from-yellow-300/40 to-orange-400/40';
    case 'clouds':
      return 'from-gray-300/40 to-gray-500/40';
    case 'rain':
      return 'from-blue-400/40 to-blue-700/40';
    case 'snow':
      return 'from-white/30 to-blue-100/30';
    case 'thunderstorm':
      return 'from-purple-700/40 to-yellow-400/40';
    default:
      return 'from-slate-500/30 to-slate-700/30';
  }
};

export default function WeatherCard({ data }) {
  const { name, main, weather, wind } = data;
  const bgGradient = getWeatherColor(weather[0].main);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      className={`relative bg-gradient-to-br ${bgGradient} text-white border border-white/30 rounded-2xl p-6 mt-6 w-full max-w-md mx-auto hover:scale-[1.03] transition-transform duration-300 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]`}
    >
      <h2 className="text-2xl font-bold mb-2 drop-shadow-sm">{name}</h2>
      <div className="flex items-center gap-4">
        <WeatherIcon condition={weather[0].main} className="w-20 h-20" />
        <div>
          <p className="text-xl font-semibold">{main.temp}°C - {weather[0].main}</p>
          <p>Humidity: {main.humidity}%</p>
          <p>Wind Speed: {wind.speed} km/h</p>
        </div>
      </div>
    </motion.div>
  );
}