function showTilesTemplate(index) {
  getSinglePkmnInfos(index);
  content.innerHTML += `
  <div id="${index}" class="pkmn-tile bg-${backgroundType}" onclick="switchOnOverlay(${index})" style="background-color: var(--${types[0]})">
    ${listOfAllPkmn[index].name.toUpperCase()}
    <span>ID# ${pkmnId}</span>
    <img class="pkmn-tile-img" src="${pkmnImage}" alt="Image of ${pkmnName}">
    <div class="pkmn-tile-type">
      ${types.map((type) => `<span class="type ${type}">${type}</span>`).join("")}
    </div>
  </div>`;
  return;
}

function getSinglePkmnInfos(index) {
  pkmnName = singlePkmns[index].name;
  pkmnId = singlePkmns[index].id;
  pkmnImage = singlePkmns[index].sprites.other["official-artwork"].front_default;
  backgroundType = singlePkmns[index].types[0].type.name;
  pkmnTypes = singlePkmns[index].types;
  types = pkmnTypes.map((t) => t.type.name);
  const word = singlePkmns[index].species.name;
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = word.slice(1);
  pkmnSpecies = firstLetterCap + remainingLetters;
  pkmnHeight = singlePkmns[index].height;
  pkmnWeight = singlePkmns[index].weight;
  pkmnAbilities = singlePkmns[index].abilities;
  abilities = pkmnAbilities.map((t) => t.ability.name);
  abilities = abilities.map(firstUpperLetter);
  pkmnHp = singlePkmns[index].stats[0].base_stat;
  pkmnAttack = singlePkmns[index].stats[1].base_stat;
  pkmnDefense = singlePkmns[index].stats[2].base_stat;
  pkmnSpecialattack = singlePkmns[index].stats[3].base_stat;
  pkmnSpecialdefense = singlePkmns[index].stats[4].base_stat;
  pkmnSpeed = singlePkmns[index].stats[5].base_stat;
}

function renderPkmnCard(index) {
  getSinglePkmnInfos(index);

  return `
  <div class="pkmnCardOuter" style="background-image: linear-gradient(to right, var(--${types[0]}2), #181717)">
    <div id="${index}" class="pkmnCardInner bg-${backgroundType}" style="background-color: var(--${types[0]})">
      <span class="text-center">${pkmnName.toUpperCase()} #${pkmnId}</span>
      <div class="cardTypesImg">
        <div class="pkmn-card-type">
          ${types.map((type) => `<span class="type">${type}</span>`).join("")}
        </div>
        <img class="pkmn-tile-img" src="${pkmnImage}" alt="Image of ${pkmnName}">        
      </div>
      <div class="pkmnCardInfoPart">
        <div class="pkmnCardInfoPartHeader">
          <span class="pkmnCardInfoPartHeaderButtons" onclick="cardInfoSectionChanger(${index}, 1)">About</span>
          <span class="pkmnCardInfoPartHeaderButtons" onclick="cardInfoSectionChanger(${index}, 2)">Base Stats</span>
        </div>
        <div id="pkmnCard-infoSection" class="pkmnCardInfoSection">
        </div>
      </div>      
    </div>
  </div>`;
}

function renderPkmnAbout(index) {
  getSinglePkmnInfos(index);
  return `
  <table>
    <tr>
      <td>Species:</td><td>${pkmnSpecies}</td>
    </tr>
    <tr>
      <td>Height:</td><td>${pkmnHeight} cm</td>
    </tr>
    <tr>
      <td>Weight:</td><td>${pkmnWeight} kg</td>
    </tr>
    <tr>
      <td>Abilities:</td><td>${abilities.map((ability) => `<span">${ability}</span>`).join(", ")}</td>
    </tr>
  `;
}

function renderPkmnBasestats(index) {
  getSinglePkmnInfos(index);
  return `
  <table>
    <tr>
      <td><label for="pkmnHp">HP:</label></td><td>${pkmnHp}</td><td><progress id="pkmnHp" value="${pkmnHp}" max="100">${pkmnHp}</progress></td>
    </tr>
    <tr>
      <td><label for="pkmnAttack">Attack:</label></td><td>${pkmnAttack}</td><td><progress id="pkmnAttack" value="${pkmnAttack}" max="100">${pkmnAttack}</progress></td>
    </tr>
    <tr>
      <td><label for="pkmnDefense">Defense:</label></td><td>${pkmnDefense}</td><td><progress id="pkmnDefense" value="${pkmnDefense}" max="100">${pkmnDefense}</progress></td>
    </tr>
    <tr>
      <td><label for="pkmnSpecialattack">Spec. attack:</label></td><td>${pkmnSpecialattack}</td><td><progress id="pkmnSpecialattack" value="${pkmnSpecialattack}" max="100">${pkmnSpecialattack}</progress></td>
    </tr>
    <tr>
      <td><label for="pkmnSpecialdefense">Spec. defense:</label></td><td>${pkmnSpecialdefense}</td><td><progress id="pkmnSpecialdefense" value="${pkmnSpecialdefense}" max="100">${pkmnSpecialdefense}</progress></td>
    </tr>
    <tr>
      <td><label for="pkmnSpeed">Speed:</label></td><td>${pkmnSpeed}</td><td><progress id="pkmnSpeed" value="${pkmnSpeed}" max="100">${pkmnSpeed}</progress></td>
    </tr>
  `;
}

function renderPkmnGender(index) {
  getSinglePkmnInfos(index);
  return `
  <table>
    <tr>
      <td>Gender</td>
    </tr>
    <tr>
      <td>Height:</td><td>${pkmnHeight} cm</td>
    </tr>
    <tr>
      <td>Weight:</td><td>${pkmnWeight} kg</td>
    </tr>
    <tr>
      <td>Abilities:</td><td>${abilities.map((ability) => `<span">${ability}</span>`).join(", ")}</td>
    </tr>
  `;
}

function renderPkmnShiny(index) {
  getSinglePkmnInfos(index);
  return `
  <table>
    <tr>
      <td>Shiny</td>
    </tr>
    <tr>
      <td>Height:</td><td>${pkmnHeight} cm</td>
    </tr>
    <tr>
      <td>Weight:</td><td>${pkmnWeight} kg</td>
    </tr>
    <tr>
      <td>Abilities:</td><td>${abilities.map((ability) => `<span">${ability}</span>`).join(", ")}</td>
    </tr>
  `;
}
