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
      
    // Function show modal
    function showModal(title, text){
      let modalContainer = document.querySelector('#modal-container');
      
      // Clear all existing modal content
      modalContainer.innerHTML ='';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Add new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      // Close button
      closeButtonElement.addEventListener('click',hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = title;

      let contentElement = document.createElement('p');
      contentElement.innerText = text;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
    
      modalContainer.classList.add('is-visible');
    }

    // Function hide Modal
    function hideModal (){
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible') 
    };

    // Hide event listeners
    // ESC key
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
      }
    });

    // Clicking outside of the modal
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
        
        // Show Details
        function showDetails(pokemon) {
          loadDetails(pokemon).then(function () {
            showModal(pokemon)});
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


