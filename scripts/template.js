function showTilesTemplate(index) {
  let pkmnName = singlePkmns[index].name;
  let pkmnId = singlePkmns[index].id;
  let pkmnImage = singlePkmns[index].sprites.other["official-artwork"].front_default;
  let backgroundType = singlePkmns[index].types[0].type.name;
  let pkmnTypes = singlePkmns[index].types;
  let types = pkmnTypes.map((t) => t.type.name);

  content.innerHTML += `<div class="grow" onclick="switchOnOverlay(0)">
    <img class="${backgroundType}" src="${pkmnImage}" alt="Image of ${pkmnName}">
    ${allPkmn[index].name.toUpperCase()}<br>
    ${types.map((type) => `<span class="type ${type}">${type}</span>`).join("")}    
    </div>`;
}
