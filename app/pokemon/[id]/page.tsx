'use client';
import React from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
    const selectedItem = useSelector((state) => state.pokemon.selectedItem);
    console.log(selectedItem);

    return (
        <div>
            {selectedItem ? (
                <div>
                    <h2>{selectedItem.name}</h2>
                    <img src={selectedItem.sprites.front_default} alt={selectedItem.name} />
                    <p>Types: {selectedItem.types.join(', ')}</p>
                </div>
            ) : (
                <p>No item selected</p>
            )}
        </div>
    );
};

export default Page;
