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
        <div className='w-full sm:w-1/2 md:w-1/2  lg:w-1/5 p-5 border border-white rounded-[20px] cursor-pointer pokemon-card min-w-[280px]' >
            <h3>{name}</h3>
            <img src={sprites.front_default} alt={name} className="w-full h-auto object-contain" />
        </div>
    );
};

export default PokemonCard;
