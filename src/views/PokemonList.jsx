import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import PokeCard from '../components/PokeCard';
import Search from '../components/Search';
import { fetchPokemon, fetchPokemonBySearch } from '../services/Pokemon';

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    try {
      const fetchData = async() => {
        const data = await fetchPokemon();
        setPokemon(data);
        setLoading(false);
      }
    fetchData();
    } catch(e) {
      setError(e.message);
    }
  }, []) 


  const handleSearch = async(search) => {
    if (search.length === 0) {
      const data = await fetchPokemon();
      setPokemon(data);
    } else {
      const data = await fetchPokemonBySearch(search);
      setPokemon(data);
    }
  }

  return (
    <div>
      <h2>Pokemon Compendium</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <label>Search Pokemon By Name</label>
      <Search callback={handleSearch}/>
      {pokemon.map((poke) => (
        <PokeCard key={poke.id} {...{poke}} />
      ))}
    </div>
  )
}
