const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(data => trianer(data))
})

function trianer(data) {
    data.forEach(t => createtrianer(t));
}

function createtrianer(t) {

    //     <div class="card" data-id="1"><p>Prince</p>
    //   <button data-trainer-id="1">Add Pokemon</button>
    //   <ul>
    //     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    //     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    //     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    //     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    //     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
    //   </ul>
    // </div>
    let div = document.createElement('div')
    div.className = "card"
    let p = document.createElement('p')
    p.innerText = t.name
    let btnadd = document.createElement('button')
    let ul = document.createElement('ul')
    btnadd["data-trainer-id"] = t.id
    btnadd.innerText = "Add Pokemon"
    btnadd.addEventListener("click", () => {
        params = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trainer_id: t.id })
        }
        fetch(POKEMONS_URL, params)
            .then(r => r.json())
            .then(json => createPok(json, ul))
            .catch(e => displayError(e, ul))
    })

    t.pokemons.forEach(p => createPok(p, ul))
    div.append(p, btnadd, ul)
    const main = document.querySelector("main")
    main.append(div)

}

function createPok(p, ul) {
    if (!p.nickname) {
        displayError("Too much pokemons, release one", ul)
    } else {
        let li = document.createElement("li")
        li.innerText = `${p.nickname} (${p.species})`
        let btnrls = document.createElement('button')
        btnrls["data-pokemon-id"] = p.id
        btnrls.className = "release"
        btnrls.innerText = "Release"
        btnrls.addEventListener('click', () => {
            fetch(`${POKEMONS_URL}/${p.id}`, { method: "DELETE" })
                .then(li.remove())
                .catch(e => displayError(e, ul))
        })
        li.append(btnrls)
        ul.append(li)
    }
}

function displayError(e, element) {
    const div = document.createElement("div")
    div.innerText = e
    div.className = "errorMessage"
        // const header = document.querySelector("header")
    element.append(div)
    setInterval(function() { div.remove() }, 1000)

}