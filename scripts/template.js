function showTilesTemplate(index) {
  let pkmnName = singlePkmns[index].name;
  let pkmnId = singlePkmns[index].id;
  let pkmnImage = singlePkmns[index].sprites.other["official-artwork"].front_default;
  let backgroundType = singlePkmns[index].types[0].type.name;
  let pkmnTypes = singlePkmns[index].types;
  let types = pkmnTypes.map((t) => t.type.name);
  console.log(pkmnId);

  console.log(types);

  content.innerHTML += `
  <div id="${index}" class="pkmn-tile bg-${backgroundType}" onclick="switchOnOverlay(0)" style="background-color: var(--${types[0]})">
    ${allPkmn[index].name.toUpperCase()}
    <span>ID# ${pkmnId}</span>
    <img class="pkmn-tile-img" src="${pkmnImage}" alt="Image of ${pkmnName}">
    <div class="pkmn-tile-type">
      ${types.map((type) => `<span class="type ${type}">${type}</span>`).join("")}
    </div>
  </div>`;
}

