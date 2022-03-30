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
console.log(pokemonList);



// List Pokemon names and height in document
pokemonList.forEach(function(item){
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