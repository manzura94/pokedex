'use client';

import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    console.log(query);
  };

  return (
    <input 
      type="text" 
      value={query} 
      onChange={(e) => setQuery(e.target.value)} 
      placeholder="Search Pokemon..." 
    />
  );
};

export default SearchBar;
