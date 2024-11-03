'use client';

import Image from '@/node_modules/next/image';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setSelectedType } from '../store/pokemonSlice';
import { RootState, AppDispatch } from './store';
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
        <div className='flex justify-end gap-[50px] w-full max-w-[1200px] h-[50px] my-[50px] mx-auto'>
            <div className='cursor-pointer' onClick={()=> router.push('/favorites')}>
                <Image src={Cart} alt={'shopping-cart icon'} width={45} height={45} />
            </div>
            <div className='min-w-[500px]'>
                <input className='w-full h-full text-black' type='text' value={searchTerm} onChange={handleSearch} placeholder='Filter by Pokemon type...' />
            </div>
            <select className='min-w-[100px] p-2 border border-gray-300 rounded' value={selectedType} onChange={(e) => handleFilterChange(e.target.value.toLowerCase())}>
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
