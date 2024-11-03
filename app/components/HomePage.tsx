'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, fetchPokemons, removeFavorite, setSelectedItem } from '../store/pokemonSlice';
import SearchBar from '../components/SearchBar';
import { RootState, AppDispatch } from './store';
import Link from 'next/link';
import { HeartIcon } from './icons/HeartIcon';

export interface PokemonProps {
    name: string;
    url: string;
    sprites: {
        front_default: string;
    };
    types: [];
    id: string;
    weight: number;
    height: number;
}

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list, searchTerm, selectedType, favorites, loading } = useSelector((state: RootState) => state.pokemon);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        dispatch(fetchPokemons(offset));
    }, [dispatch, offset]);

    const loadMore = () => {
        setOffset((prev) => prev + 10);
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
        if (favorites.some((fav: { id: string }) => fav.id === pokemon.id)) {
            dispatch(removeFavorite(pokemon.id));
        } else {
            dispatch(addFavorite(pokemon));
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <SearchBar />
            <div className='flex flex-wrap justify-between gap-5 max-w-[1200px] w-full'>
                {filteredList.length ? (
                    filteredList.map((pokemon: PokemonProps, index: number) => {
                        const isFavorite = favorites.some((fav: { id: string }) => fav.id === pokemon.id);

                        return (
                            <Link href={`pokemon/${index}`} key={index} passHref>
                                <div
                                    className='w-full sm:w-1/2 md:w-1/2  lg:w-1/5 p-5 border border-white rounded-[20px] cursor-pointer pokemon-card min-w-[280px]'
                                    onClick={() => handlePokemonClick(pokemon)}
                                >
                                    <HeartIcon isClicked={isFavorite} handleLikeClick={(e) => handleLikeClick(e, pokemon)} />
                                    <h3>{pokemon.name}</h3>
                                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className='w-full h-auto object-contain' />
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p>No results found</p>
                )}
            </div>
            {filteredList.length ? (
                <button onClick={loadMore} className='load-more'>
                    Load More
                </button>
            ) : (
                ''
            )}
        </div>
    );
};

export default HomePage;
