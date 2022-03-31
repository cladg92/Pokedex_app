let pokemonRepository = (function (){
    let pokemonList = [
        {
            name:'Bulbasaur',
            height: 4,
            types:['grass','poison'] 
        },
        {
            name:'Venusaur',
            height: 2, 
            types:['fairy','ice','flying']
        },
        {
            name:'Weedle', 
            height: 0.3, 
            types:['bug','poison','fire']
        }
    ];

    function arrayEquals(a, b) {
        return Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index]);
      }
    // function to get the whole list
    function getAll(){
        return pokemonList;
    }
    // function to add new pokemons to the list
    function add (pokemon){
        if (typeof pokemon === 'object' && arrayEquals(Object.keys(pokemon),['name','height', 'types'])){ // add new item only if datatype object and has specific keys
        pokemonList.push(pokemon);
        }
    }

    function showDetails(pokemon){
        console.log(pokemon.name)
    }

    // function to display pokemons on DOM as buttons
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // Button event listener on click
        button.addEventListener('click', function (event){showDetails(pokemon)});
    }

    // function to filter specific pokemon
    function getPokemon (pokemonName){
        return pokemonRepository.getAll().filter(pokemon => pokemon.name == pokemonName);
    };

    return {
        getAll: getAll,
        add: add,
        addListItem:addListItem,
        getPokemon:getPokemon,
        showDetails:showDetails
    }
})();


// access pokemonList
console.log(pokemonRepository.getAll());


// add pokemon to pokemonList
pokemonRepository.add({name: 'Dot', height: 10, types:['cuddle', 'ice']});
console.log(pokemonRepository.getAll());


// select specific pokemon
let pokemonName = ['Dot'];
console.log(pokemonRepository.getPokemon(pokemonName));




// List Pokemon names in document
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
}) 



// Show only selected Pokemon name in document
/* pokemonRepository.getPokemon(pokemonName).forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
})  */




// List Pokemon names and height in document (add forEach)
/* pokemonRepository.getAll().forEach(function(item){
    if(item.height>3){
        document.write(`<p><span class=name>${item.name}</span> (height: ${item.height}). <span class="tall_pokemon"> Wow, that's tall!</span></p>`);
    } else{
        document.write(`<p><span class="name">${item.name}</span> (height: ${item.height}).</p>`)
    }
}) */

// List Pokemon names and height in document
/* for(i=0; i<pokemonList.length; i++){
    if(pokemonList[i].height>3){
        document.write(`<p><span class=name>${pokemonList[i].name}</span> (height: ${pokemonList[i].height}). <span class="tall_pokemon"> Wow, that's tall!</span></p>`);
    } else{
        document.write(`<p><span class="name">${pokemonList[i].name}</span> (height: ${pokemonList[i].height}).</p>`)
    }
} */