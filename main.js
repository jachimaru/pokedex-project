const results = document.getElementById('results');
const searchButton = document.getElementById('searchButton');
const input = document.getElementById('search');
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'
let userInput;
const typeColor = {
    bug: '#8a9711',
    dark: '#47342d',
    dragon: '#735cda',
    electric: '#f1b725',
    fairy: '#eda9ed',
    fighting: '#743522',
    fire: '#c72103',
    flying: '#5d73d7',
    ghost: '#484493',
    grass: '#6dbf31',
    ground: '#846d33',
    ice: '#70d1f4',
    normal: '#b0ab9d',
    poison: '#592a5c',
    psychic: '#db3164',
    rock: '#9f873b',
    steel: '#8f8ea1',
    water: '#0d67c1',
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        results.replaceChildren();
        userInput = input.value;
        const loading = document.createElement('h3');
        loading.textContent = "Searching for " + userInput + "...";
        results.appendChild(loading);
        showResult();
    }
});

searchButton.addEventListener('click', () => {
    results.replaceChildren();
    userInput = input.value;
    const loading = document.createElement('h3');
    loading.textContent = "Searching for " + userInput + "...";
    results.appendChild(loading);
    showResult();
});

async function showResult() {
        const response = await fetch(apiUrl + userInput);
        if (!response.ok) {
            results.replaceChildren();
            const error = document.createElement('h1');
            error.textContent = 'Pokémon not found!';
            results.appendChild(error);
            return;
        }
        const data = await response.json();
        results.replaceChildren();
        console.log(data);
        //wrapper
        const wrapper = document.createElement('div');
        results.appendChild(wrapper);
        

        //name
        const text = document.createElement('h1');
        const title = data.name[0].toUpperCase() + data.name.slice(1);
        text.textContent = title;

        //Image
        const spriteUrl = data.sprites.front_default;
        const sprite = document.createElement('img');
        sprite.src = spriteUrl;
        sprite.style.border = '5px solid #991a1a';
        sprite.style.borderRadius = '50px';
        sprite.style.background = '#556078';
        sprite.style.padding = '10px';

        //typing
        const type1 = data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.slice(1);
        const type1Color = data.types[0].type.name;
        let type2Color;
        const type1Text = document.createElement('span');
        const type2Text = document.createElement('span');
        const typeStart = document.createElement('span');
        const slash = document.createTextNode(' / ');
        let type2;
        if (data.types.length === 1) {
            type2 = "";
            type2Color = "";
            typeStart.textContent = 'Type: ';
        } else {
            type2 = data.types[1].type.name[0].toUpperCase() + data.types[1].type.name.slice(1);
            type2Color = data.types[1].type.name;
            typeStart.textContent = 'Types: ';
        }
        const typeText = document.createElement('p');
        type1Text.textContent = type1;
        type2Text.textContent = type2;
        type1Text.style.color = typeColor[type1Color];
        type2Text.style.color = typeColor[type2Color];

        if (type2 === '') {
            typeText.appendChild(typeStart);
            typeText.appendChild(type1Text);
        } else {
            typeText.appendChild(typeStart);
            typeText.appendChild(type1Text);
            typeText.appendChild(slash);
            typeText.appendChild(type2Text);
        }
        typeText.style.background = '#000';
        typeText.style.border = '#87a7b6 5px solid';
        typeText.style.borderRadius = '10px';
        typeText.style.padding = '5px';
        
        

        wrapper.appendChild(text)
        wrapper.appendChild(sprite)
        wrapper.appendChild(typeText)
        wrapper.classList.add('pokemon-card')
    };