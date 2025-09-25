const BASE_URL = "https://pokeapi.co/api/v2/";
let allPkmn = [];
let offset = 0;
let limit = 2;
let singlePkmns = [];
let content = document.getElementById("content");

async function init() {
  allPkmn = await loadPkmn("pokemon/", offset, limit);
  console.log(allPkmn);
  

  for (let index = 0; index < allPkmn.length; index++) {
    let pokemon = await loadSinglePokemons(index);
    singlePkmns.push(pokemon);
  }
  
  for (let index = 0; index < allPkmn.length; index++) {
    showTilesTemplate(index);
  }
}

async function loadPkmn(ext, offset, limit) {
  let response = await fetch(BASE_URL + ext + "?offset=" + offset + "&limit=" + limit);
  response = await response.json();
  return response.results;
}

async function loadSinglePokemons(index) {
  let response = await fetch(allPkmn[index].url);
  response = await response.json();
  console.log(response);
  return response;
}
