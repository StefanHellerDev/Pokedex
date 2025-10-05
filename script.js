const BASE_URL = "https://pokeapi.co/api/v2/";
let allPkmn = [];
let offset = 0;
let limit = 5;
let singlePkmns = [];
let content = document.getElementById("pkmn-content");

async function init() {
  loaderOn();
  allPkmn = await fetchPkmn("pokemon/", 0, 10000);
  await loadPkmn();
}

async function loadPkmn() {
  loaderOn();
  for (let index = 0; index < limit; index++) {
    const pokemon = await loadSinglePokemons(index + offset);
    singlePkmns.push(pokemon);
  }
  for (let index = 0; index < limit; index++) {
    showTilesTemplate(index + offset);
  }
  offset = offset + limit;
  setTimeout(loaderOff, 1);
  return;
}

async function fetchPkmn(ext, offset, limit) {
  let response = await fetch(BASE_URL + ext + "?offset=" + offset + "&limit=" + limit);
  response = await response.json();
  return response.results;
}

async function loadSinglePokemons(index) {
  let response = await fetch(allPkmn[index].url);
  response = await response.json();
  return response;
}

function loaderOn() {
  let overlayRef = document.getElementById("loader-overlay");
  overlayRef.classList.remove("d_none");
}

function loaderOff() {
  let overlayRef = document.getElementById("loader-overlay");
  overlayRef.classList.add("d_none");
}

function switchOnOverlay(index) {
  let overlayRef = document.getElementById("overlay");
  overlayRef.classList.remove("d_none");
  let dialogRef = document.getElementById("dialog");
  dialogRef.innerHTML = renderPkmn(index);
}

function switchOffOverlay() {
  let overlayRef = document.getElementById("overlay");
  overlayRef.classList.add("d_none");
}

function bubblingPropagation(event) {
  event.stopPropagation();
}
