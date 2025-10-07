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
          <span class="pkmnCardInfoPartHeaderButtons">About</span>
          <span class="pkmnCardInfoPartHeaderButtons">Base Stats</span>
          <span class="pkmnCardInfoPartHeaderButtons">Gender</span>
          <span class="pkmnCardInfoPartHeaderButtons">Shiny</span>
        </div>
        <div id="pkmnCardInfoSection" class="pkmnCardInfoSection">
        </div>
      </div>      
    </div>
  </div>`;
}
