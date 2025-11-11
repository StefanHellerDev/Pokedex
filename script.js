const BASE_URL = "https://pokeapi.co/api/v2/";
let listOfAllPkmn = [];
let offset = 0;
let limit = 20;
let singlePkmns = [];
let content = document.getElementById("pkmn-content");
let searchTerm = "";
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
  await loadDisplayPkmn(listOfAllPkmn, limit, offset);
  offset = offset + limit;
}

async function fetchPkmn(ext, offset, limit) {
  let response = await fetch(BASE_URL + ext + "?offset=" + offset + "&limit=" + limit);
  response = await response.json();
  return response.results;
}

async function loadDisplayPkmn(array, count, start) {
  loaderOn();
  for (let index = 0; index < count; index++) {
    const pokemon = await loadSinglePokemons(array, index + start);
    singlePkmns.push(pokemon);
  }
  for (let index = 0; index < count; index++) {
    showTilesTemplate(array, index + start);
  }
  setTimeout(loaderOff, 500);
  return;
}

async function loadSinglePokemons(array, index) {
  let response = await fetch(array[index].url);
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
  searchTerm = event.target.value;
  const pkmnSearchButton = document.getElementById("pkmnSearchButton");
  if (searchTerm.length >= 3) {
    singlePkmns = [];
    pkmnSearchButton.removeAttribute("disabled");
    pkmnFind();
  } else if (searchTerm.length == 0) {
    singlePkmns = [];
    offset = 0;
    content.innerHTML = "";
    const loadButton = document.getElementById("loadMoreButtonId");
    loadButton.classList.remove("d_none");
    loadDisplayPkmn(listOfAllPkmn, limit, offset);
  } else {
    pkmnSearchButton.setAttribute("disabled", "");
  }
}

function pkmnFind() {
  searchResult = filterItems(listOfAllPkmn, searchTerm);
  content.innerHTML = "";
  const loadButton = document.getElementById("loadMoreButtonId");
  loadButton.classList.add("d_none");
  loadDisplayPkmn(searchResult, searchResult.length, 0);
}

function filterItems(array, query) {
  return array.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
}

function getSinglePkmnInfos(index) {
  getSinglePkmnTileInfo(index);
  getSinglePkmnSpecies(index);
  pkmnHeight = singlePkmns[index].height;
  pkmnWeight = singlePkmns[index].weight;
  getSinglePkmnAbilities(index);
  pkmnHp = singlePkmns[index].stats[0].base_stat;
  pkmnAttack = singlePkmns[index].stats[1].base_stat;
  pkmnDefense = singlePkmns[index].stats[2].base_stat;
  pkmnSpecialattack = singlePkmns[index].stats[3].base_stat;
  pkmnSpecialdefense = singlePkmns[index].stats[4].base_stat;
  pkmnSpeed = singlePkmns[index].stats[5].base_stat;
}

function getSinglePkmnAbilities(index) {
  pkmnAbilities = singlePkmns[index].abilities;
  abilities = pkmnAbilities.map((t) => t.ability.name);
  abilities = abilities.map(firstUpperLetter);
}

function getSinglePkmnSpecies(index) {
  const word = singlePkmns[index].species.name;
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = word.slice(1);
  pkmnSpecies = firstLetterCap + remainingLetters;
}

function getSinglePkmnTileInfo(index) {
  pkmnName = singlePkmns[index].name;
  pkmnId = singlePkmns[index].id;
  pkmnImage = singlePkmns[index].sprites.other["official-artwork"].front_default;
  backgroundType = singlePkmns[index].types[0].type.name;
  pkmnTypes = singlePkmns[index].types;
  types = pkmnTypes.map((t) => t.type.name);
}
