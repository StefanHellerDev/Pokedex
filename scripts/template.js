function showTilesTemplate(index) {
    content.innerHTML +=
    `<div class="grow" onclick="switchOnOverlay(0)">
    ${allPkmn.results[index].name.toUpperCase()}<br>
    type 1<br>
    type 2 -- bild
    </div>`;
}