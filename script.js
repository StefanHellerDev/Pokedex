const BASE_URL = "https://pokeapi.co/api/v2/";
let listOfAllPkmn = [];
let offset = 0;
let limit = 6;
let singlePkmns = [];
let content = document.getElementById("pkmn-content");

let pkmnName = [];
let pkmnId = [];
let pkmnImage = [];
let backgroundType = [];
let pkmnTypes = [];
let types = [];

async function init() {
  loaderOn();
  listOfAllPkmn = await fetchPkmn("pokemon/", 0, 10000);
  await loadPkmn();
  switchOnOverlay(2); // Test!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

async function fetchPkmn(ext, offset, limit) {
  let response = await fetch(BASE_URL + ext + "?offset=" + offset + "&limit=" + limit);
  response = await response.json();
  return response.results;
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
  setTimeout(loaderOff, 500);
  return;
}

async function loadSinglePokemons(index) {
  let response = await fetch(listOfAllPkmn[index].url);
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
  disableMainScrolling();
  let overlayRef = document.getElementById("overlay");
  overlayRef.classList.remove("d_none");
  let pkmnCardRef = document.getElementById("dialog");
  pkmnCardRef.innerHTML = renderPkmnCard(index);
}

function switchOffOverlay() {
  enableMainScrolling();
  let overlayRef = document.getElementById("overlay");
  overlayRef.classList.add("d_none");
}

function bubblingPropagation(event) {
  event.stopPropagation();
}

function disableMainScrolling() {
  document.body.style.overflow = "hidden";
}

function enableMainScrolling() {
  document.body.style.overflow = "";
}
