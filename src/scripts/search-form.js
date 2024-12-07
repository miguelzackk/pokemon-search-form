const pokemonNameElement = document.querySelector(".pokemon-name");
const pokemonInfoElement = document.querySelector(".poke-info");
const specsElement = document.querySelector(".specs");
const pokemonImageElement = document.querySelector(".pokemon");

const form = document.getElementById("pokemon-form");
const input = document.getElementById("pokemon-name");

const fetchPokemonData = async (pokemon) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
    if (!response.ok) throw new Error("Pokémon not found");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonNameElement.innerText = "Loading...";
  pokemonInfoElement.innerHTML = "";
  specsElement.innerHTML = "";
  pokemonImageElement.style.display = "none";

  const data = await fetchPokemonData(pokemon);

  if (data) {
    pokemonNameElement.innerText = data.name;
    pokemonInfoElement.innerHTML = `<span>${data.id} -</span> <span class="pokemon-name">${data.name}</span>`;
    specsElement.innerHTML = `
      <h6>Height: ${(data.height / 10).toFixed(1)}m.</h6>
      <h6>Weight: ${(data.weight / 10).toFixed(1)}kg.</h6>
      <h6>Types: ${data.types.map((type) => type.type.name).join(", ")}.</h6>
    `;

    const sprite = data.sprites.front_default;
    if (sprite) {
      pokemonImageElement.src = sprite;
      pokemonImageElement.style.display = "block";
    } else {
      pokemonImageElement.style.display = "none";
    }
  } else {
    pokemonNameElement.innerText = "Not Found :c";
    pokemonInfoElement.innerHTML = "";
    specsElement.innerHTML = "<h6>Check the name or number!</h6>";
    pokemonImageElement.style.display = "none";
  }

  input.value = "";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = input.value.trim().toLowerCase();
  if (query) renderPokemon(query);
});

window.addEventListener("load", () => {
  renderPokemon(1);
});
