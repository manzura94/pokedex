'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, fetchPokemons, removeFavorite, setSelectedItem, resetList } from '../store/pokemonSlice';
import SearchBar from '../components/SearchBar';
import { RootState, AppDispatch } from '../store';
import Link from 'next/link';
import { HeartIcon } from './icons/HeartIcon';
import Image from 'next/image';

export interface PokemonProps {
    name: string;
    url: string;
    sprites: {
        front_default: string;
    };
    types: [];
    id: string;
}

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list, searchTerm, selectedType, favorites, loading } = useSelector((state: RootState) => state.pokemon);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        dispatch(resetList());
        setOffset(0);
        dispatch(fetchPokemons(offset));
    }, [dispatch, offset]);

    const loadMore = () => {
        const newOffset = offset + 10;
        setOffset(newOffset);
        dispatch(fetchPokemons(newOffset));
    };

    const filteredList = list
        .filter((pokemon: PokemonProps) => pokemon?.name?.includes(searchTerm))
        .filter((pokemon: PokemonProps) => selectedType === 'all' || pokemon.types.some((type) => type === selectedType));

    const handlePokemonClick = (pokemon: PokemonProps) => {
        dispatch(setSelectedItem(pokemon));
    };

    const handleLikeClick = (e: React.MouseEvent, pokemon: PokemonProps) => {
        e.stopPropagation();
        e.preventDefault();
        if (favorites.some((fav: PokemonProps) => fav.id === pokemon.id)) {
            dispatch(removeFavorite(pokemon.id));
        } else {
            dispatch(addFavorite(pokemon));
        }
    };

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <p className='text-[25px] font-bold'>Loading...</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center mx-auto max-w-[1200px] w-full'>
            <SearchBar />
            <div className='grid grid-cols-1 p-2 m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full'>
                {filteredList.length ? (
                    filteredList.map((pokemon: PokemonProps, index: number) => {
                        const isFavorite = favorites.some((fav: PokemonProps) => fav.id === pokemon.id);

                        return (
                            <Link href={`pokemon/${index}`} key={index} passHref>
                                <div
                                    className='p-5 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer min-w-[250px] m-2'
                                    onClick={() => handlePokemonClick(pokemon)}
                                >
                                    <HeartIcon isClicked={isFavorite} handleLikeClick={(e) => handleLikeClick(e, pokemon)} />
                                    <h3 className='text-lg font-semibold text-center mb-3'>{pokemon.name}</h3>

                                    <Image src={pokemon.sprites.front_default} alt={pokemon.name} className='w-full h-auto object-contain rounded-md' width={100} height={100} />
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p className='col-span-full text-center text-gray-500'>No results found</p>
                )}
            </div>
            {filteredList.length ? (
                <button onClick={loadMore} className='mt-6 px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600'>
                    Load More
                </button>
            ) : null}
        </div>
    );
};

export default HomePage;
