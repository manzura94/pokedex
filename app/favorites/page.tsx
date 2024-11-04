'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { removeFavorite } from '../store/pokemonSlice';
import DeleteIcon from '../components/icons/DeleteIcon';
import HomeButton from '../components/HomeButton';
import { PokemonProps } from '../components/HomePage';
import Image from 'next/image';

const Favorites = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { favorites } = useSelector((state: RootState) => state.pokemon);
    const handleRemoveClick = (item: PokemonProps) => {
        dispatch(removeFavorite(item.id));
    };

    return (
        <div className='flex flex-col items-center p-8 m-8 min-h-screen max-w-[1200px] mx-auto '>
            <HomeButton />
            <div className='flex flex-wrap gap-8 justify-center w-full max-w-[1200px]'>
                {favorites.length ? (
                    favorites.map((item: PokemonProps) => {
                        return (
                            <div
                                key={item.id}
                                className='flex flex-col items-center border  bg-gray shadow-lg rounded-lg p-5 max-w-xs w-full transform transition-transform hover:scale-105'
                            >
                                <div className='text-lg font-bold text-white-700 mb-3'>{item.name}</div>
                                <div>
                                    <Image src={item.sprites.front_default} alt='pokemon image' width={100} height={100} className='mb-4' />
                                </div>
                                <div className='mt-4 p-2  hover:bg-red-600 text-white rounded-full'>
                                    <DeleteIcon handleRemoveClick={() => handleRemoveClick(item)} />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className='text-center text-gray-500 w-full text-lg'>No favourite item found</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;
