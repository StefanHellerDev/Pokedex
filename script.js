const BASE_URL = "https://pokeapi.co/api/v2/";
let listOfAllPkmn = [];
let offset = 0;
let limit = 20;
let singlePkmns = [];
let content = document.getElementById("pkmn-content");

// cardInfoSection = "";
// console.log(cardInfoSection);

let cardInfoSectionPart = 0;

let pkmnName = [];
let pkmnId = [];
let pkmnImage = [];
let backgroundType = [];
let pkmnTypes = [];
let types = [];
let pkmnSpecies = [];

async function init() {
  loaderOn();
  listOfAllPkmn = await fetchPkmn("pokemon/", 0, 10000);
  await loadPkmn();
  // switchOnOverlay(2); // Test!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  if (index < 0) {
    index = offset - 1;
  } else if (index == offset) {
    index = 0;
  }
  
  let overlayRef = document.getElementById("overlay");
  overlayRef.classList.remove("d_none");
  let pkmnCardRef = document.getElementById("dialog");
  pkmnCardRef.innerHTML = renderPkmnCard(index);
  cardInfoSectionChanger(index, 1);
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

function cardInfoSectionChanger(index, cardInfoSectionPart) {
  let cardInfoSection = document.getElementById("pkmnCard-infoSection");
  if (cardInfoSectionPart == 1) {
    cardInfoSection.innerHTML = renderPkmnAbout(index);
  } else if (cardInfoSectionPart == 2) {
    cardInfoSection.innerHTML = renderPkmnBasestats(index);
  } else if (cardInfoSectionPart == 3) {
    cardInfoSection.innerHTML = renderPkmnGender(index);
  } else if (cardInfoSectionPart == 4) {
    cardInfoSection.innerHTML = renderPkmnShiny(index);
  } else {
    console.error("Error");
  }
}

function firstUpperLetter(num) {
  const word = num;
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = word.slice(1);
  return firstLetterCap + remainingLetters;
}

function searchInput(event) {
  const searchTerm = event.target.value;
  const pkmnSearchButton = document.getElementById("pkmnSearchButton");
  if (searchTerm.length >= 3) {
    pkmnSearchButton.removeAttribute("disabled");
  } else {
    pkmnSearchButton.setAttribute("disabled", "");
  }
  
  console.log(searchTerm);
}
