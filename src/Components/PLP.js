// PLP.js
import React, { useEffect, useRef } from 'react';
import PokemonCard from './PokemonCard';
import NavBar from './NavBar';
import { useStore } from '../store';

const PLP = () => {
  const apiURL = "https://pokeapi.co/api/v2/pokemon/";
  const fetchPokemons = useStore((state) => state.fetchPokemons);
  const pokemons = useStore((state) => state.pokemons);

  const containerRef = useRef(null);//used to point to the observing element

  useEffect(() => {
    fetchPokemons(apiURL); // Initial load of 10 pokemons
  }, []);

  const loadMorePokemons = () => {
    fetchPokemons(apiURL); // Load the next set of 10 pokemons
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {//intersection observer
      if (entry.isIntersecting) {//triggeres the function when the observing element is in focus
        loadMorePokemons();
      }
    });

    if (containerRef.current) {// if the last div exists? then observe
      observer.observe(containerRef.current);
    }

    return () => {//unmount the observer
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
        <div ref={containerRef}>
        <p>Loading.. </p>
        </div>
      </div>
    </>
  );
};

export default PLP;
