'use client';

import React from 'react';

interface SearchBarProps {
    nameQuery: string;
    setNameQuery: (query: string) => void;
    typeQuery: string;
    setTypeQuery: (query: string) => void;
}

const SearchBar = ({ typeQuery, setTypeQuery, nameQuery, setNameQuery }: SearchBarProps) => {
    const pokemonTypes = ['All', 'Fire', 'Water', 'Grass', 'Poison', 'Bug', 'Flying', 'Dragon'];

    return (
        <div className='flex justify-end gap-[50px] w-full max-w-[1200px] h-[50px] my-[50px] mx-auto'>
            <div className='min-w-[500px]'>
                <input
                    className='w-full h-full text-black'
                    type='text'
                    value={nameQuery}
                    onChange={(e) => setNameQuery(e.target.value.toLowerCase())}
                    placeholder='Filter by Pokemon type...'
                />
            </div>
            <select className='min-w-[100px] p-2 border border-gray-300 rounded' value={typeQuery} onChange={(e) => setTypeQuery(e.target.value.toLowerCase())}>
                {pokemonTypes.map((type) => (
                    <option key={type} value={type.toLowerCase()}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchBar;
