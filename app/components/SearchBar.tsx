'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setSelectedType } from '../store/pokemonSlice';
import { RootState, AppDispatch } from './store';

interface SearchBarProps {
    nameQuery: string;
    setNameQuery: (query: string) => void;
    typeQuery: string;
    setTypeQuery: (query: string) => void;
}

const SearchBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { searchTerm, selectedType } = useSelector((state: RootState) => state.pokemon);

    const pokemonTypes = ['All', 'Fire', 'Water', 'Grass', 'Poison', 'Bug', 'Flying', 'Dragon'];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const handleFilterChange = (type: string) => {
        dispatch(setSelectedType(type));
    };

    return (
        <div className='flex justify-end gap-[50px] w-full max-w-[1200px] h-[50px] my-[50px] mx-auto'>
            <div className='min-w-[500px]'>
                <input className='w-full h-full text-black' type='text' value={searchTerm} onChange={handleSearch} placeholder='Filter by Pokemon type...' />
            </div>
            <select
                className='min-w-[100px] p-2 border border-gray-300 rounded'
                value={selectedType} onChange={(e) => handleFilterChange(e.target.value.toLowerCase())}
            >
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
