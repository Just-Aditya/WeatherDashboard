import {
    Sun,
    Cloud,
    CloudRain,
    CloudSnow,
    CloudLightning,
    CloudSun,
    CloudMoon,
    Moon,
  } from 'lucide-react';
  
  const iconMap = {
    Clear: Sun,
    Clouds: Cloud,
    Rain: CloudRain,
    Snow: CloudSnow,
    Thunderstorm: CloudLightning,
    Drizzle: CloudRain,
    Haze: CloudSun,
    Mist: CloudMoon,
    Fog: CloudMoon,
    Smoke: CloudMoon,
    Dust: CloudMoon,
    Sand: CloudMoon,
    Ash: CloudMoon,
    Squall: CloudLightning,
    Tornado: CloudLightning,
    Night: Moon,
  };
  
  export default function WeatherIcon({ condition, className = "w-10 h-10" }) {
    const IconComponent = iconMap[condition] || Cloud;
    return <IconComponent className={className} />;
  }
  