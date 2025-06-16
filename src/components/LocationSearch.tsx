
import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LocationSearchProps {
  onLocationSelect: (location: { latitude: number; longitude: number; name: string }) => void;
  onClose: () => void;
}

const LocationSearch = ({ onLocationSelect, onClose }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    name: string;
    latitude: number;
    longitude: number;
    country: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchLocations = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchLocations(searchQuery);
  };

  const handleLocationClick = (location: typeof searchResults[0]) => {
    onLocationSelect({
      latitude: location.latitude,
      longitude: location.longitude,
      name: `${location.name}, ${location.country}`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md mx-4 shadow-2xl">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Search Location</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Enter city name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length >= 2) {
                  searchLocations(e.target.value);
                }
              }}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Search size={18} />
            </Button>
          </form>

          {isLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto"></div>
            </div>
          )}

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {searchResults.map((location, index) => (
              <button
                key={index}
                onClick={() => handleLocationClick(location)}
                className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{location.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{location.country}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {searchQuery.length >= 2 && searchResults.length === 0 && !isLoading && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No locations found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
