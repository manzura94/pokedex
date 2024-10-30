'use client';

import React from 'react';

interface SearchBarProps {
    typeQuery: string;
    setTypeQuery: (query: string) => void;
}

const SearchBar = ({ typeQuery, setTypeQuery }: SearchBarProps) => {
    return (
        <div className='w-1/2 min-w-[500px] h-[50px] my-[50px] mx-auto'>
            <input
                className='w-full h-full text-black'
                type='text'
                value={typeQuery}
                onChange={(e) => setTypeQuery(e.target.value.toLowerCase())}
                placeholder='Filter by Pokemon type...'
            />
        </div>
    );
};

export default SearchBar;
