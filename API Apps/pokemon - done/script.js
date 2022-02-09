const cardContainer = document.querySelector(".container");

async function fetchPokemon(id) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const result = await fetch(apiUrl);
  const res = await result.json();
  //   console.log(res);
  displayPokemon(res);
}

const displayPokemon = function (data) {
  const { sprites } = data;
  let divElement = `<div class="pokemon">
    <img src="${sprites.back_default}" alt="">
        <div class="info">
            <div class="id">id: #${data.id.toString().padStart(3, "0")}</div>
            <div class="name">Name:${data.name}</div>
            <div class="power">Power: ${data.types[0].type.name}</div>
        </div>`;
  cardContainer.insertAdjacentHTML("afterbegin", divElement);
};

function init() {
  for (let i = 1; i <= 12; i++) {
    fetchPokemon(i);
  }
}

init();
