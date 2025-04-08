import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) onSearch(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="w-full max-w-md relative">
      <div className="flex items-center backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-sky-400 transition">
        <Search className="w-5 h-5 text-white/70 mr-2" />
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent w-full text-white placeholder-white/60 outline-none"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-1 rounded-full transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
