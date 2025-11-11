function showTilesTemplate(array, index) {
  getSinglePkmnInfos(index);
  content.innerHTML += `
  <div id="${index}" class="pkmn-tile bg-${backgroundType}" onclick="switchOnOverlay(${index})" style="background-color: var(--${types[0]})">
    ${array[index].name.toUpperCase()}
    <span>ID# ${pkmnId}</span>
    <img class="pkmn-tile-img" src="${pkmnImage}" alt="Image of ${pkmnName}">
    <div class="pkmn-tile-type">
      ${types.map((type) => `<span class="type ${type}">${type}</span>`).join("")}
    </div>
  </div>`;
  return;
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

      <div class="dialogNav">
          <img src="./assets/img/arrow_circle_left.png" alt="Arrow Circle Left" onclick="switchOnOverlay(${index - 1})">
          <img src="./assets/img/arrow_circle_right.png" alt="Arrow Circle Right" onclick="switchOnOverlay(${index + 1})">
       </div>

    </div>
  </div>`;
}

function renderPkmnAbout(index) {
  getSinglePkmnInfos(index);
  return `
  <table>
    <tr>
      <td class="tdSmall">Species:</td><td>${pkmnSpecies}</td>
    </tr>
    <tr>
      <td class="tdSmall">Height:</td><td>${pkmnHeight} cm</td>
    </tr>
    <tr>
      <td class="tdSmall">Weight:</td><td>${pkmnWeight} kg</td>
    </tr>
    <tr>
      <td class="tdSmall">Abilities:</td><td>${abilities.map((ability) => `<span">${ability}</span>`).join(", ")}</td>
    </tr>
  `;
}

function renderPkmnBasestats(index) {
  getSinglePkmnInfos(index);
  return `
  <table>
    <tr>
      <td class="tdSmall"><label for="pkmnHp">HP:</label></td><td class="tdSmall">${pkmnHp}</td><td class="tdBig"><progress id="pkmnHp" value="${pkmnHp}" max="100">${pkmnHp}</progress></td>
    </tr>
    <tr>
      <td class="tdSmall"><label for="pkmnAttack">Attack:</label></td><td class="tdSmall">${pkmnAttack}</td><td class="tdBig"><progress id="pkmnAttack" value="${pkmnAttack}" max="100">${pkmnAttack}</progress></td>
    </tr>
    <tr>
      <td class="tdSmall"><label for="pkmnDefense">Defense:</label></td><td class="tdSmall">${pkmnDefense}</td><td class="tdBig"><progress id="pkmnDefense" value="${pkmnDefense}" max="100">${pkmnDefense}</progress></td>
    </tr>
    <tr>
      <td class="tdSmall"><label for="pkmnSpecialattack">Spec. attack:</label></td><td class="tdSmall">${pkmnSpecialattack}</td><td class="tdBig"><progress id="pkmnSpecialattack" value="${pkmnSpecialattack}" max="100">${pkmnSpecialattack}</progress></td>
    </tr>
    <tr>
      <td class="tdSmall"><label for="pkmnSpecialdefense">Spec. defense:</label></td><td class="tdSmall">${pkmnSpecialdefense}</td><td class="tdBig"><progress id="pkmnSpecialdefense" value="${pkmnSpecialdefense}" max="100">${pkmnSpecialdefense}</progress></td>
    </tr>
    <tr>
      <td class="tdSmall"><label for="pkmnSpeed">Speed:</label></td><td class="tdSmall">${pkmnSpeed}</td><td class="tdBig"><progress id="pkmnSpeed" value="${pkmnSpeed}" max="100">${pkmnSpeed}</progress></td>
    </tr>
  `;
}
