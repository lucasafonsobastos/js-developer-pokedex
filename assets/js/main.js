const sectionContent = document.querySelector('section.content');
const sectionContentDetail = document.querySelector('section.content-detail');

const listaPokemon = document.querySelector('[class="pokemons"]');
let itensListaPokemon = [];
const btMais = document.querySelector('button#bt-carregaMais');

let btVoltar = document.querySelector('div.div-titulo button'); 

sectionContentDetail.style.display = 'none';
sectionContent.style.display = 'block';

const geracao = 151;
const offset = 0;
let limit = 10;

btVoltar.addEventListener('click', ()=> {
    console.log('recarregando a pagina');
    //document.location.reload(true);
});


function carregaPokemons(pokemon) {
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

function carregaDetalhesPokemon(pokemon) {
    return `
    <div class="${pokemon.tipo}">
        <div class="div-titulo">
            <button><img src="/assets/img/seta-esquerda.png" alt=""></button>
            <img src="/assets/img/pokebola_1.png" alt="">
        </div>
        <div class="div-name">
            <div>
                <h1 class="nome">${pokemon.nome}</h1>
            <span class="number">#${pokemon.id}</span>
            </div>
            <ol class="types ">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        </div>
        <div class="div-imagem">
            <img src="${pokemon.imagem}" alt="imagem pkemon"/>
        </div>
        <div class="div-detail">
            <span class="status">Detalhes</span>
            <ol class="lista-stat">
                ${pokemon.status.map((stat) => 
                    `<li class="stat">
                        <div class="stat-div">
                            <h3>${stat.stat.name}</h4> 
                            <h2>${stat.base_stat}</h4>
                        </div>
                        <div class="stat-span ${pokemon.tipo}">
                            <div class="nivel" style="width: ${(stat.base_stat)/2}%"></div>
                        </div>
                    </li>` ).join('')}
            </ol>
        </div>
    </div>
    `
}

function carregarListaPokemons(offset, limit) {
    
    pokeApi.getListPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map(carregaPokemons).join('');
            listaPokemon.innerHTML = newHtml;

            itensListaPokemon = document.querySelectorAll('[id="pokemon"]');
            selecionaPokemon(itensListaPokemon, pokemons);
        })

}

carregarListaPokemons(offset, limit);

btMais.addEventListener('click', () => {
    limit += 50;

    if (limit >= geracao - 1) {
        limit = geracao;
    } else {
        limit = limit;
    }
    carregarListaPokemons(offset, limit);
});

function selecionaPokemon(lista=[], pokemons){
    lista.forEach((element, index) => {
        element.addEventListener('click', ()=> {
            console.log(pokemons[index]);
            sectionContentDetail.style.display = 'block';
            sectionContent.style.display = 'none';

            sectionContentDetail.innerHTML = carregaDetalhesPokemon(pokemons[index]);
        })
    });
}
