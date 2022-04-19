//import fetch from 'node-fetch';
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';




    // function to add new pokemons to pokemonList
    function add(pokemon) {
        if (
          typeof pokemon === 'object' &&
          'name' in pokemon,
          'detailsUrl' in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log('pokemon is not correct');
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
      listItem.classList.add('list-group-item');
      let button = document.createElement('button');
      button.innerText = pokemon.name.toUpperCase();
      button.classList.add('button');
      button.classList.add('btn', 'btn-dark', 'btn-md', 'w-100');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#exampleModal');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      // Button event listener on click
      button.addEventListener('click', function (){showDetails(pokemon)
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
    // Function show modal
    function showModal(pokemon){
      // eslint-disable-next-line no-undef
      let modalBody = $('.modal-body');
      // eslint-disable-next-line no-undef
      let modalTitle = $('.modal-title');

      modalTitle.empty();
      modalBody.empty();

      //creating element for name in modal content
      // eslint-disable-next-line no-undef
      let pokemonName = $('<h1>'+ pokemon.name.toUpperCase() + '</h1>');
      //creating image in modal content
      // eslint-disable-next-line no-undef
      let pokemonImage = $('<img class = "modal-img" style= "width:50%">');
      pokemonImage.attr('src', pokemon.imageUrl);
      //creating element for height in modal content
      // eslint-disable-next-line no-undef
      let pokemonHeight = $('<p>'+ 'height: ' + pokemon.height + '</p>');
      //creating element for types in modal content
      let pokemonTypes = document.createElement('p');
      let types = pokemon.types;
    // Function to get all of the pokemon types
    function getType (item){
        if (types.length == 1){
          let type = item.type;
          pokemonTypes.innerText = 'Types: ' + type.name;
        } else if (types.indexOf(item) == 0 && types.indexOf(item) + 1 < types.length){
          let type = item.type;
          pokemonTypes.innerText += 'Types: ' + type.name + ', ';
        } else if (types.indexOf(item) + 1 < types.length){
          let type = item.type;
          pokemonTypes.innerText += type.name + ', ';
        } else {
          let type = item.type;
          pokemonTypes.innerText += ' ' + type.name ;
        }
      }
    types.forEach(getType)


      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonTypes);

    }

    // Show Details
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon)});
    }

    // sort pokemon List
    function sortList() {
      var list, i, switching, b, shouldSwitch;
      list = document.getElementById('pokemon-list');
      switching = true;
      /* Make a loop that will continue until
      no switching has been done: */
      while (switching) {
        // start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName('LI');
        // Loop through all list-items:
        for (i = 0; i < (b.length - 1); i++) {
          // start by saying there should be no switching:
          shouldSwitch = false;
          /* check if the next item should
          switch place with the current item: */
          if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
            /* if next item is alphabetically
            lower than current item, mark as a switch
            and break the loop: */
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          /* If a switch has been marked, make the switch
          and mark the switch as done: */
          b[i].parentNode.insertBefore(b[i + 1], b[i]);
          switching = true;
        }
      }
    }


    // Function to search and filter Pokemons
    function searchPokemon() {
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      ul = document.getElementById("pokemon-list");
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByTagName("button")[0];
          txtValue = a.textContent || a.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              li[i].style.display = "";
          } else {
              li[i].style.display = "none";
          }
      }
  }


      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        sortList: sortList,
        searchPokemon: searchPokemon
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

// sort Pokemon List
pokemonRepository.sortList();


  
});
