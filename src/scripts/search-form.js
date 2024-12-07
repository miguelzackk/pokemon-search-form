const form = document.getElementById("pokemon-form");
const openPokedexBtn = document.getElementById("open-pokedex");
const input = document.getElementById("pokemon-name");
const infoContainer = document.getElementById("pokemon-info");

async function getPokemon(event) {
  event.preventDefault();

  const pokemonName = input.value.trim().toLowerCase();
  input.value = "";

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) {
      throw new Error("Pokemon not found!");
    }
    const pokemon = await response.json();

    infoContainer.innerHTML = `
    <div class="card">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <div class="text-card">
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <p><strong>Height:</strong>${pokemon.height / 10}m.</p>
        <p><strong>Weight:</strong>${pokemon.weight / 10}kg.</p>
        <p><strong>Types:</strong>${pokemon.types
          .map((type) => type.type.name)
          .join(", ")}.</p>
      </div>
    </div>
  `;
  } catch (error) {
    console.error("Error", error);

    infoContainer.innerHTML = `
            <p class="error-text" >Erro: Pokemon not found. Try again in a few minutes</p>
        `;
  }
}

form.addEventListener("submit", getPokemon);
