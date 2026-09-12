const results = document.getElementById('results');
const searchButton = document.getElementById('searchButton');
const input = document.getElementById('search');
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'
let userInput;

searchButton.addEventListener('click', () => {
    results.replaceChildren();
    userInput = input.value;
    const loading = document.createElement('h3');
    loading.textContent = "Searching for " + userInput + "...";
    results.appendChild(loading);
    showResult()
    
})

async function showResult() {
        const response = await fetch(apiUrl + userInput);
        if (!response.ok) {
            results.replaceChildren();
            const error = document.createElement('h1')
            error.textContent = 'Pokémon not found!';
            results.appendChild(error);
            return
        }
        const data = await response.json();
        results.replaceChildren();
        console.log(data)
        //name
        const text = document.createElement('h1');
        const title = data.name[0].toUpperCase() + data.name.slice(1)
        text.textContent = title

        //Image
        const spriteUrl = data.sprites.front_default;
        const sprite = document.createElement('img');
        sprite.src = spriteUrl
        sprite.style.border = '5px solid #991a1a'
        sprite.style.borderRadius = '50px'
        sprite.style.background = '#556078'

        //typing
        const type1 = data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.slice(1);
        let type2;
        if (data.types.length === 1) {
            type2 = ""
        } else {
            type2 = data.types[1].type.name[0].toUpperCase() + data.types[1].type.name.slice(1);
        }
        const typeText = document.createElement('p');
        if (type2 === '') {
            typeText.textContent = "Type: " + type1
        } else {
            typeText.textContent = "Types: " + type1 + " / " + type2
        }
        
        

        results.appendChild(text)
        results.appendChild(sprite)
        results.appendChild(typeText)
    }