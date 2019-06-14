const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
  main();
})

function main() {
  loadTrainers();
}

function loadTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => displayTrainers(json))
}

function displayTrainers(trainers) {
  trainers.forEach(trainer => displayTrainer(trainer));
}

function displayTrainer(trainer) {
  const main = document.querySelector("main");
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id", trainer.id);
  const name = document.createElement("p");
  name.textContent = trainer.name;
  const addButton = document.createElement("button");
  addButton.setAttribute("data-trainer-id", trainer.id);
  addButton.textContent = "Add Pokemon";
  const ul = document.createElement("ul");
  displayPokemons(trainer.pokemons, ul)
  addButton.addEventListener('click', (event) => {
    addPokemon(trainer, ul);
  })
  card.appendChild(name);
  card.appendChild(addButton);
  card.appendChild(ul)
  main.appendChild(card);

}

function addPokemon(trainer, ul) {
  //const ul = card.childNodes[2];
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"trainer_id": trainer.id})
  })
  .then(resp => resp.json())
  .then(pokemon => {
    if (!pokemon.error) {
      displayPokemon(pokemon, ul)
    }
  })

}

function displayPokemons(pokemons, ul) {
  pokemons.forEach(pokemon => displayPokemon(pokemon, ul))
}

function displayPokemon(pokemon, ul) {
  const li = document.createElement("li");
  const releaseButton = document.createElement("button");
  li.textContent = pokemon.nickname + " (" + pokemon.species +")";
  releaseButton.textContent = "Release";
  releaseButton.className = "release";
  releaseButton.setAttribute("data-pokemon-id", pokemon.id);
  li.appendChild(releaseButton);
  releaseButton.addEventListener('click', () => {
    deletePokemon(pokemon, li);
  })
  ul.appendChild(li);
}

function deletePokemon(pokemon, li) {
  fetch(POKEMONS_URL + "/" + pokemon.id, {
    method: 'DELETE',
  })
  .then(resp => resp.json())
  .then(json => {
    li.remove()
  })

}
