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

    function getAll(){
        return pokemonList;
    }

    function add (pokemon){
        if (typeof pokemon === 'object' && arrayEquals(Object.keys(pokemon),['name','height', 'types'])){ // add new item only if datatype object and has specific keys
        pokemonList.push(pokemon);
        }
    }

    return {
        getAll: getAll,
        add: add
    }
})();


// access pokemonList
console.log(pokemonRepository.getAll());


// add pokemon to pokemonList
pokemonRepository.add({name: 'Dot', height: 10, types:['cuddle', 'ice']});
console.log(pokemonRepository.getAll());
    




// List Pokemon names and height in document
pokemonRepository.getAll().forEach(function(item){
    if(item.height>3){
        document.write(`<p><span class=name>${item.name}</span> (height: ${item.height}). <span class="tall_pokemon"> Wow, that's tall!</span></p>`);
    } else{
        document.write(`<p><span class="name">${item.name}</span> (height: ${item.height}).</p>`)
    }
})

/* for(i=0; i<pokemonList.length; i++){
    if(pokemonList[i].height>3){
        document.write(`<p><span class=name>${pokemonList[i].name}</span> (height: ${pokemonList[i].height}). <span class="tall_pokemon"> Wow, that's tall!</span></p>`);
    } else{
        document.write(`<p><span class="name">${pokemonList[i].name}</span> (height: ${pokemonList[i].height}).</p>`)
    }
} */