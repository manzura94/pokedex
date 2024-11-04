'use client';

import Image from '@/node_modules/next/image';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setSelectedType } from '../store/pokemonSlice';
import { RootState, AppDispatch } from '../store';
import Cart from '../../public/cart.svg';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { searchTerm, selectedType } = useSelector((state: RootState) => state.pokemon);
    const router = useRouter();

    const pokemonTypes = ['All', 'Fire', 'Water', 'Grass', 'Poison', 'Bug', 'Flying', 'Dragon'];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const handleFilterChange = (type: string) => {
        dispatch(setSelectedType(type));
    };

    return (
        <div className='flex flex-wrap items-center justify-between gap-4 w-full min-w-[100%] max-w-[1200px] my-[50px] mx-auto'>
            <div className='cursor-pointer' onClick={() => router.push('/favorites')}>
                <Image src={Cart} alt={'shopping-cart icon'} width={45} height={45} />
            </div>
            <input
                className='flex-grow min-w-[250px] max-w-[500px] w-full h-10 px-4 border border-gray-300 rounded-lg shadow-sm  text-black'
                type='text'
                value={searchTerm}
                onChange={handleSearch}
                placeholder='Search Pokemon...'
            />
            <select className='h-10 px-3 border border-gray-300 text-black rounded-lg' value={selectedType} onChange={(e) => handleFilterChange(e.target.value.toLowerCase())}>
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
