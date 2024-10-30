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

    const [nameQuery, setNameQuery] = useState('');
    const [typeQuery, setTypeQuery] = useState('all');

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

    const filteredPokemons = pokemons.filter((pokemon) => {
        const matchesName = pokemon.name.toLowerCase().includes(nameQuery);
        const matchesType = typeQuery === 'all' || (pokemon.types && pokemon.types.find((type) => type === typeQuery));
        console.log(pokemon.types);
        return matchesName && matchesType;
    });

    return (
        <div>
            <SearchBar nameQuery={nameQuery} setNameQuery={setNameQuery} typeQuery={typeQuery} setTypeQuery={setTypeQuery} />
            <div className='flex flex-wrap justify-between gap-5 max-w-[1200px] w-full'>
                {filteredPokemons.length ? (
                    filteredPokemons.map((pokemon) => <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} sprites={pokemon.sprites} />)
                ) : (
                    <p>No results found</p>
                )}
            </div>
            {loading && <p className='flex flex-wrap justify-center my-4 text-[22px] font-bold'>Loading...</p>}
        </div>
    );
};

export default HomePage;
