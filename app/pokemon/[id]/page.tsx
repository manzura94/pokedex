'use client';
import HomeButton from '@/app/components/HomeButton';
import { PokemonProps } from '@/app/components/HomePage';
import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

const Page = () => {
    const selectedItem = useSelector((state: { pokemon: { selectedItem: PokemonProps } }) => state.pokemon.selectedItem);

    return (
        <div className='flex flex-col items-center p-8 m-8 min-h-screen max-w-[1200px] mx-auto '>
            <HomeButton />
            <div className='container max-w-5xl mx-auto mt-20'>
                {selectedItem ? (
                    <div className='bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto'>
                        <h2 className='text-3xl font-bold text-gray-800 mb-6 text-center'>{selectedItem.name}</h2>
                        <div className='flex flex-col md:flex-row items-center gap-8'>
                            <Image className='w-48 h-48 object-contain' src={selectedItem.sprites.front_default} alt={selectedItem.name} width={100} height={100} />
                            <div className='text-left space-y-4'>
                                <p className='text-gray-700'>
                                    <span className='font-semibold'>Types:</span> {selectedItem.types.join(', ')}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className='text-gray-600 text-center mt-20'>No item selected</p>
                )}
            </div>
        </div>
    );
};

export default Page;
