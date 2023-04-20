const listaPokemon = document.querySelector('[class="pokemons"]');
const btMais = document.querySelector('button#bt-carregaMais');

const geracao = 151; 
const offset = 0;
let limit = 10


function carregaPokemons(pokemon){
    return `
    <li id="pokemon" class="pokemon ${pokemon.tipo}">
        <span class="number">#${pokemon.id}</span>
        <span class="name">${pokemon.nome}</span>
        <div class="detail">
            <ol class="types ">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.imagem}"
                alt="${pokemon.name}">
        </div>
    </li>
    `;
}

function carregarListaPokemons (offset, limit){
    pokeApi.getListPokemons(offset, limit)
    .then((pokemons = []) => {
        const newHtml = pokemons.map(carregaPokemons).join('');

        listaPokemon.innerHTML = newHtml;
        //console.log(newHtml);
    })
}

carregarListaPokemons(offset, limit);


btMais.addEventListener('click', () => {
    limit += 50;
    
    if(limit >= geracao-1){
        limit = geracao;
    } else {
        limit = limit;
    }
    carregarListaPokemons(offset, limit);
});
