'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons } from '../store/pokemonSlice';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { RootState, AppDispatch } from './store';

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list, searchTerm, selectedType } = useSelector((state: RootState) => state.pokemon);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        dispatch(fetchPokemons(offset));
    }, [dispatch, offset]);

    const loadMore = () => setOffset((prev) => prev + 20);

    const filteredList = list
        .filter((pokemon) => pokemon?.name?.includes(searchTerm))
        .filter((pokemon) => selectedType === 'all' || pokemon.types.some((type) => type === selectedType));

    return (
        <div>
            <SearchBar />
            <div className='flex flex-wrap justify-between gap-5 max-w-[1200px] w-full'>
                {filteredList.length ? (
                    filteredList.map((pokemon) => <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} sprites={pokemon.sprites} />)
                ) : (
                    <p>No results found</p>
                )}
            </div>
            <button onClick={loadMore} className='load-more'>
                Load More
            </button>
        </div>
    );
};

export default HomePage;
