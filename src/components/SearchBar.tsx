import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = useCallback(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Пошук відгуків..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="input-field"
      />
      <button onClick={handleSearch} className="ml-2 btn-secondary">
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SearchBar;