//import fetch from 'node-fetch';
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=3';

    
    

    // function to add new pokemons to pokemonList
    function add(pokemon) {
        if (
          typeof pokemon === "object" &&
          "name" in pokemon,
          "detailsUrl" in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log("pokemon is not correct");
        }
      }

    // function to get the whole list
    function getAll(){
      return pokemonList;
    }

    // function to display pokemons on DOM as buttons with event listeners
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // Button event listener on click
        button.addEventListener('click', function (event){showDetails(pokemon)
        });
    }


    // Load Pokemons from API 
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            // add to pokemonList
            add(pokemon);
            console.log(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

    // Load Pokemon Details from API  
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
      }

      // Show Details
      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
      }
    
      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
      };
    })();


//pokemonRepository.add({name:"Dot", height: 0.3, types:["electric"]});
//console.log(pokemonRepository.getAll())


// Load list from API and then List Pokemon names in document
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});



