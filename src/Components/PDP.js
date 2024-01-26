import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import { useStore } from '../store';

const PDP = () => {
  const { id } = useParams();
  //const [pokemonData, setPokemonData] = useState(null);
  const pokemonData = useStore((state)=> state.pokemonData)//fetching data from Zustand Store
  const fetchPokemonData = useStore((state) => state.fetchPokemonData)//fetching function from Zustand Store
  const apiURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const formattedId = String(id).padStart(3,'0');
  const imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;
  //const imageURL = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${id}.png`;
  
  useEffect(() => {
    fetchPokemonData(apiURL);//triggers the function in Zustand store
  }, []);
 // console.log("PDP",pokemonData)
  return (
    <>
      <NavBar />
      <div className="pdp-container">
        {pokemonData && (
          <div className="pokemon-details">
            <h1>Pokemon Details - {pokemonData.name}</h1>
            <img src={imageURL} alt={pokemonData.name} />
            <table className="pokemon-table">
              <tbody>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>{pokemonData.name}</td>
                </tr>
                <tr>
                  <td>Abilities:</td>
                  <td>
                    {pokemonData.abilities.map((ability, index) => (
                      <p key={index}>{ability.ability.name}</p>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Base Experience:</td>
                  <td>{pokemonData.base_experience}</td>
                </tr>
                <tr>
                  <td>Height:</td>
                  <td>{pokemonData.height}</td>
                </tr>
                <tr>
                  <td>Weight:</td>
                  <td>{pokemonData.weight}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default PDP;
