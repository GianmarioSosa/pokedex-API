document.addEventListener('DOMContentLoaded', async () => {
  const pokemonList = document.getElementById('pokemon-list');

  const fetchPokemonData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const createPokemonCard = (pokemon) => {
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(',');

    const card = `
      <div class="pokemon-card mb-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="w-[200px] mx-auto">
        <h2 class="font-bold text-center capitalize mt-4 text-[30px]">${pokemon.name}</h2>
        <p class="text-center">#${pokemon.id}</p>
        <p class="text-center text-[18px]">Tipo: ${types}</p>
      </div>
    `;
    return card;
  };

  const loadPokemon = async () => {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    const data = await fetchPokemonData(url);
    const pokemonResults = data.results;

    for (const pokemon of pokemonResults) {
      const pokemonData = await fetchPokemonData(pokemon.url);
      const card = createPokemonCard(pokemonData);
      pokemonList.innerHTML += card;
    }
  };


  loadPokemon();
});
