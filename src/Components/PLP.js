// PLP.js
import React, { useEffect, useRef } from 'react';
import PokemonCard from './PokemonCard';
import NavBar from './NavBar';
import { useStore } from '../store';

const PLP = () => {
  const apiURL = "https://pokeapi.co/api/v2/pokemon/";
  const fetchPokemons = useStore((state) => state.fetchPokemons);
  const pokemons = useStore((state) => state.pokemons);

  const containerRef = useRef(null);

  useEffect(() => {
    fetchPokemons(apiURL); // Initial load of 10 pokemons
  }, []);

  const loadMorePokemons = () => {
    fetchPokemons(apiURL); // Load the next set of 10 pokemons
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMorePokemons();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef.current, loadMorePokemons]);

  return (
    <>
      <NavBar />
      <div className="plp-container">
        <h1>Pokemons</h1>
        <div className="pokemon-list" ref={containerRef}>
          {pokemons.map((pokemon, index) => (
            <PokemonCard key={index} data={pokemon} id={index + 1} />
          ))}
        </div>
        <div  ref={containerRef}>
        <p>Loading.. </p>
        </div>
      </div>
    </>
  );
};

export default PLP;
