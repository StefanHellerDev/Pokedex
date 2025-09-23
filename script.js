const BASE_URL = "https://pokeapi.co/api/v2/";
let allPkmn = [];
let offset = 0;
let limit = 6;
let pkmnTypes = [];
let content = document.getElementById("content");

async function init() {
  allPkmn = await loadPkmnOriginal("pokemon/", offset, limit);
  for (let index = 0; index < allPkmn.results.length; index++) {
    showTilesTemplate(index);
  }
}

async function loadPkmnOriginal(ext, offset, limit) {
  let response = await fetch(BASE_URL + ext + "?offset=" + offset + "&limit=" + limit);
  response = await response.json();
  return response;
}
