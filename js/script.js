let currentPage = 1;
// nos traemos los id del HTML
const valorBuscaPokemon = document.getElementById('searchInput');
const buscaPokemon = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');

// Obtener datos de la API
async function getPokemons(page) {
    try {
        valorBuscaPokemon.vale = valorBuscaPokemon.value.toLowerCase();

        if (valorBuscaPokemon.value === undefined || valorBuscaPokemon.value === '') {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page}`);
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            todosPokemon(data);
        } else {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${valorBuscaPokemon.value}`);
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            const data = await response.json();
            unPokemon(data);

        }
    } catch (error) {
        console.error('Error: ', error);
        alert(error);
    }
}

// Mostrar todos los pokemon
async function todosPokemon(data) {
    const imgContainer = document.getElementById('app');
    imgContainer.innerHTML = '';

    for (let i = 0; i < data.results.length; i++) {
        try {
            const response = await fetch(data.results[i].url);
            const pokemonData = await response.json();

            const pokemonCard = document.createElement('div');
            const img = document.createElement('img');
            const nombre = document.createElement('h3');

            // añado clases para dar estilo a la tarjeta del Pokémon
            pokemonCard.classList.add('pokemon-card');
            img.classList.add('imagen-pokemon');
            nombre.classList.add('nombre-pokemon');

            // imagen, nombre y datos del pokemon
            img.src = pokemonData.sprites.other['official-artwork'].front_default; // Imagen frontal del Pokémon en alta difinición
            img.alt = pokemonData.name;
            nombre.textContent = pokemonData.name;

            // añado los elementos al div principal
            imgContainer.appendChild(pokemonCard);
            pokemonCard.appendChild(img);
            pokemonCard.appendChild(nombre);
        } catch (error) {
            console.error('Error: ', error);
            alert(error);
        }
    }
}

async function unPokemon(data) {
    const imgContainer = document.getElementById('app');  // consigo el div del HTML
    imgContainer.innerHTML = '';  // Limpiar el div para que no se muestren imágenes anteriores

    // altura y peso del pokemon
    const altura = document.createElement('p');
    const peso = document.createElement('p');
    altura.classList.add('datos-pokemon');
    peso.classList.add('datos-pokemon');
    altura.textContent = `Altura: ${data.height} cm`;
    peso.textContent = `Peso: ${(data.weight / 100).toFixed(1)} kg`;

    const pokemonCard = document.createElement('div');
    const img = document.createElement('img');
    const nombre = document.createElement('h3');

    pokemonCard.classList.add('pokemon-card');
    img.classList.add('imagen-pokemon-card');
    nombre.classList.add('nombre-pokemon');

    img.src = data.sprites.other['official-artwork'].front_default; // Imagen frontal del Pokémon en alta definición
    img.alt = data.name;
    nombre.textContent = data.name; // Nombre del Pokémon

    imgContainer.appendChild(pokemonCard);
    pokemonCard.appendChild(img);
    pokemonCard.appendChild(altura);
    pokemonCard.appendChild(peso);
    pokemonCard.appendChild(nombre);
}







// --------------------------------------------- HACEMOS CLICK EN SEARCH ---------------------------------------------
buscaPokemon.addEventListener('click', () => {
    getPokemons(currentPage);
});

// --------------------------------------------- HACEMOS ENTER EN SEARCH INPUT ---------------------------------------
valorBuscaPokemon.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getPokemons(currentPage);
    }
});

// --------------------------------------------- HACEMOS CLICK EN PREVIOUS -------------------------------------------
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getPokemons(currentPage);
    }
});

// --------------------------------------------- HACEMOS CLICK EN NEXT -----------------------------------------------
nextBtn.addEventListener('click', () => {
    currentPage++;
    getPokemons(currentPage);
});

// --------------------------------------------- HACEMOS CLICK EN RESET ----------------------------------------------
resetBtn.addEventListener('click', () => {
    currentPage = 1;
    document.getElementById('searchInput').value = '';  // limpiamos el input para que no aparezca nada anterior
    getPokemons(currentPage);
});