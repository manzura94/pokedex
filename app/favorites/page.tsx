'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { removeFavorite } from '../store/pokemonSlice';
import DeleteIcon from '../components/icons/DeleteIcon';
import { useRouter } from 'next/navigation';

const Favorites = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { favorites } = useSelector((state: RootState) => state.pokemon);
    const router = useRouter();
    const handleRemoveClick = (item: { id: number; name: string }) => {
        dispatch(removeFavorite(item.id));
    };

    return (
        <div>
            <button onClick={() => router.push('/')}>home</button>
            {favorites.length ? (
                favorites.map((item: { id: number; name: string }) => {
                    return (
                        <div key={item.id}>
                            {item.name}
                            <div>
                                <DeleteIcon handleRemoveClick={() => handleRemoveClick(item)} />
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No favourite item found</p>
            )}
        </div>
    );
};

export default Favorites;
