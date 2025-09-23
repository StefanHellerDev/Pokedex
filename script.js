const BASE_URL = "https://pokeapi.co/api/v2/";
let allPkmn = [];
let content = document.getElementById("content");

async function init() {
  allPkmn = await initialLoadPkmn();
  for (let index = 0; index < allPkmn.results.length; index++) {
    showTilesTemplate(index);
  }
}

async function initialLoadPkmn() {
  let response = await fetch(BASE_URL + "pokemon/");
  return await response.json();
}
