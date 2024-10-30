'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons } from '../store/pokemonSlice';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemon.list);
    const loading = useSelector((state) => state.pokemon.loading);
    const hasMore = useSelector((state) => state.pokemon.hasMore);
    const offset = useSelector((state) => state.pokemon.offset);

    const [typeQuery, setTypeQuery] = useState<string>('');

    useEffect(() => {
        dispatch(fetchPokemons(0));
    }, [dispatch]);

    const handleScroll = useCallback(() => {
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight;
        if (bottom && hasMore && !loading) {
            dispatch(fetchPokemons(offset));
        }
    }, [dispatch, hasMore, loading, offset]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const filteredPokemons = typeQuery ? pokemons.filter((pokemon) => pokemon.types.some((type) => type.includes(typeQuery))) : pokemons;

    return (
        <div>
            <SearchBar typeQuery={typeQuery} setTypeQuery={setTypeQuery} />
            <div className='flex flex-wrap justify-center gap-4 mt-4'>
                {filteredPokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} sprites={pokemon.sprites} />
                ))}
            </div>
            {loading && <p className='flex flex-wrap justify-center my-4 text-[22px] font-bold'>Loading...</p>}
        </div>
    );
};

export default HomePage;
