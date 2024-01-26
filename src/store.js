// store.js
import { create } from "zustand";

const store = (set) => ({
  pokemons: [],
  fetchPokemons: async (apiURL, limit) => {
    try {
      const response = await fetch(apiURL);
      const result = await response.json();
      console.log(response);
      set((state) => ({ 
        pokemons: [...state.pokemons, ...result.results],
      }));
    } catch (err) {
      console.error("Error Fetching Pokemons", err);
    }
  },
  pokemonData: '',
  fetchPokemonData: async (apiURL) => {
    try {
      const response = await fetch(apiURL);
      const result = await response.json();
      set((state) => ({ pokemonData: result }));
    } catch (err) {
      console.error("Error Fetching Pokemon", err);
    }
  },
});

export const useStore = create(store);
