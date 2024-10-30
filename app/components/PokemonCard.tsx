import React from 'react';

interface PokemonProps {
    name: string;
    url: string;
    sprites: {
        front_default: string;
    };
}

const PokemonCard = ({ name, sprites }: PokemonProps) => {
    return (
        <div className='w-1/4 p-5 border border-white rounded-[20px] cursor-pointer pokemon-card '>
            <h3>{name}</h3>
            <img src={sprites.front_default} alt={name} />
        </div>
    );
};

export default PokemonCard;
