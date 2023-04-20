

const pokeApi = {

    getPokemonsDetail: (listaPokemons) => {
        return fetch(listaPokemons.url)
            .then((response) => response.json())
            .then(convertPokemon)
    },

    getListPokemons: (offset, limit) => {
        const urlAPI = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        return fetch(urlAPI)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((listaPokemons) => listaPokemons.map(pokeApi.getPokemonsDetail))
            .then((poke) => Promise.all(poke))
            .then((pokemons) => pokemons)
    }

}

function convertPokemon(pokemonDetail){
    let pokemon = new Pokemon();

    pokemon.id = pokemonDetail.id;
    pokemon.nome = pokemonDetail.name;
    pokemon.especie = pokemonDetail.species.name;
    pokemon.imagem = pokemonDetail.sprites.other.home.front_default;
    
    pokemon.tipo = pokemonDetail.types[0].type.name;

    const types = pokemonDetail.types.map((tipos) => tipos.type.name)
    pokemon.types = types;

    pokemon.status = pokemonDetail.stats;
    pokemon.peso = pokemonDetail.weight;
    pokemon.altura = pokemonDetail.height;

    console.log(pokemon);

    return pokemon;
}