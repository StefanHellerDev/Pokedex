const BASE_URL = "https://pokeapi.co/api/v2/";
let allPkmn = [];
let content = document.getElementById("content");

async function init() {
  allPkmn = await initialLoadPkmn();
  
}

async function initialLoadPkmn() {
  let response = await fetch(BASE_URL + "pokemon/");
  return await response.json();
}
