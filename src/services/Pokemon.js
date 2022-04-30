export async function fetchPokemon() {
  const resp = await fetch('https://pokedex-alchemy.herokuapp.com/api/pokedex');
  const data = await resp.json();
  return (data.results);
}

export async function fetchPokemonBySearch(search) {
  const params = new URLSearchParams();
  params.set('pokemon', search);
  const resp = await fetch(`https://pokedex-alchemy.herokuapp.com/api/pokedex?${params.toString()}`);
  const data = await resp.json();
  console.log('testing sucks', data);
  return (data.results);
}