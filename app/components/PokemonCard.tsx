import React from 'react';

interface PokemonProps {
  name: string;
  url: string;
}

const PokemonCard: React.FC<PokemonProps> = ({ name, url }) => {
  return (
    <div className="pokemon-card">
      <h3>{name}</h3>
      <a href={url}>Details</a>
    </div>
  );
};

export default PokemonCard;
