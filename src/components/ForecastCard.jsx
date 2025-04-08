import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';

const getForecastColor = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return 'from-yellow-400/40 to-orange-400/40';
    case 'clouds':
      return 'from-gray-300/40 to-gray-500/40';
    case 'rain':
      return 'from-blue-400/40 to-blue-700/40';
    case 'snow':
      return 'from-white/30 to-blue-100/30';
    case 'thunderstorm':
      return 'from-purple-700/40 to-yellow-400/40';
    default:
      return 'from-slate-600/40 to-slate-800/40';
  }
};

const getForecastAnimation = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return {
        rotate: [0, 10, 0],
        transition: { repeat: Infinity, duration: 4 }
      };
    case 'clouds':
      return {
        x: [0, 5, -5, 0],
        transition: { repeat: Infinity, duration: 6, ease: 'linear' }
      };
    case 'rain':
      return {
        y: [0, 6],
        transition: { repeat: Infinity, repeatType: 'reverse', duration: 0.6 }
      };
    default:
      return {};
  }
};

export default function ForecastCard({ forecast }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
      {forecast.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className={`bg-gradient-to-br ${getForecastColor(item.condition)} backdrop-blur-2xl p-4 rounded-2xl shadow-xl text-center text-white border border-white/30 hover:scale-[1.05] transition-transform duration-300 relative overflow-hidden`}
        >
          <p className="font-semibold mb-1 drop-shadow">{item.day}</p>
          <motion.img
            src={`https://openweathermap.org/img/wn/${item.icon}@4x.png`}
            alt="icon"
            className="mx-auto w-16 h-16"
            animate={getForecastAnimation(item.condition)}
          />
          <p>{item.temp}°C</p>
          <p className="text-sm">{item.condition}</p>
        </motion.div>
      ))}
    </div>
  );
}