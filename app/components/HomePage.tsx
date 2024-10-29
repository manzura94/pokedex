'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons } from '../store/pokemonSlice';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemon.list);
    console.log(pokemons);

    useEffect(() => {
        dispatch(fetchPokemons(0));
    }, [dispatch]);

    return (
        <div>
            <SearchBar />
            <div className='pokemon-list'>
                {pokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
