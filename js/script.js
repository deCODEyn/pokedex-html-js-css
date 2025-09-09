const MAX_POKEMON = 1025;
const MIN_POKEMON = 1;

const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.getElementById('input-search');

const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if(apiResponse.ok) {
    const result = await apiResponse.json();
    return result;
  }
  return;
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'loading...';
  pokemonNumber.innerHTML = '';
  pokemonImage.src = 'https://projectpokemon.org/images/sprites-models/sv-sprites-home/0000.png';
  
  const data = await fetchPokemon(pokemon);
  input.value = '';

  if(data) {
    const imageId = data.id.toString().padStart(4,'0');
    pokemonName.innerHTML = data.species.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = `https://projectpokemon.org/images/sprites-models/sv-sprites-home/${imageId}.png`;
    searchPokemon = data.id;
    return;
  }
  pokemonName.innerHTML = 'not found :(';
  pokemonNumber.innerHTML = '00';
  pokemonImage.src = 'https://archives.bulbagarden.net/media/upload/a/a1/Substitute_artwork.png';
  
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
  if(searchPokemon > MIN_POKEMON) {
    renderPokemon(searchPokemon - 1);
  }
});

btnNext.addEventListener('click', () => {
  if(searchPokemon < MAX_POKEMON) {
    renderPokemon(searchPokemon + 1);
  }
});

renderPokemon(searchPokemon);






// Imagens GIF direto da pokeapi mas apenas até o id:649.
// pokemonImage.src = data['sprite']['versions']['generation-v']['black-white']['animated']['front_default']

// Imagens para todos os pokemons direto da pokeapi
// pokemonImage.src = data['sprites']['front_default']

// Imagens GIF pela projectpokemon as apenas até o id:893. Duas url, precisa validação.
// 1~809      pokemonImage.src = `https://projectpokemon.org/images/normal-sprite/${data.species.name}.gif`
// 810~893    pokemonImage.src = `https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/${data.species.name}.gif`

// Imagem para todos os pokemons pela projectpokemon
// pokemonImage.src = `https://projectpokemon.org/images/sprites-models/sv-sprites-home/${imageId}.png`;