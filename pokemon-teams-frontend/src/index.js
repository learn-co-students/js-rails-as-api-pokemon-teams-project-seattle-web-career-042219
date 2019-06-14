const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {

    function main() {
        fetchTrainers()
    }

    main()

    function fetchTrainers() {
        fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => displayTrainers(json))
    }

    function deletePokemon(pokemon_id) {
        let config = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }
        fetch(POKEMONS_URL + `/${pokemon_id}`, config)
        .then(resp => resp.json)
        .then(json => {

        })
    }

    function getPokemon(trainer_id, ul) {
        let payload = {trainer_id: trainer_id}
        let config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }

        fetch(POKEMONS_URL, config)
        .then(resp => resp.json())
        .then(json => {
            addPokemon(json, ul)
        })
    }

    function displayTrainers(json) {
        json.forEach((trainer) => {
            displayTrainer(trainer)
        })
    }

    function displayTrainer(trainer) {
        let main = document.getElementById('trainer-container')
        let div = document.createElement('div')
        let p = document.createElement('p')
        let btn = document.createElement('button')
        let ul = document.createElement('ul')

        main.appendChild(div)
        div.appendChild(p)
        div.appendChild(btn)
        div.appendChild(ul)

        
        p.textContent = trainer.name
        btn.setAttribute('data-trainer-id', trainer.id)
        btn.textContent = "Add Pokemon"

        btn.addEventListener('click', () => {
            getPokemon(trainer.id, ul)
        })

        trainer.pokemons.forEach((pokemon) => {
            let li = document.createElement('li')
            let relBtn = document.createElement('button')
            
            
            
            ul.appendChild(li)
            
            

            let pokemonName = `${pokemon.nickname} (${pokemon.species})`
            li.textContent = pokemonName
            li.appendChild(relBtn)

            relBtn.textContent = "Release"
            relBtn.className = "release"
            relBtn.setAttribute('data-pokemon-id', pokemon.id)

            relBtn.addEventListener('click', () => {
                deletePokemon(pokemon.id)
                li.remove()
            })
            
        })
    }


    function addPokemon(pokemon, ul) {
        let li = document.createElement('li')
        let relBtn = document.createElement('button')

        ul.appendChild(li)

        let pokemonName = `${pokemon.nickname} (${pokemon.species})`
        li.textContent = pokemonName

        li.appendChild(relBtn)
        

        relBtn.className = "release"
        relBtn.setAttribute('data-pokemon-id', pokemon.id)
        relBtn.textContent = "Release"


        relBtn.addEventListener('click', () => {
            deletePokemon(pokemon.id)
            li.remove()
        })
        

        

        

    }

















})
