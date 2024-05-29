document.addEventListener("DOMContentLoaded", () =>{
const pokemonName = document.getElementById("pokemonName");
const button = document.getElementById("button");
const loading = document.getElementById("loading");


button.addEventListener("click", fetchData);

pokemonName.addEventListener("keydown", function (event) {
if (event.key === "Enter") {
    fetchData();
}
});
async function fetchData(){
    let error = document.getElementById("error")
    try{
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        
        loading.style.display = "block";
        error.style.display = "none";
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
            error.textContent = "Not a valid Pokemon";
            error.style.color = "red";
            error.style.display = "block";
            console.error("Error element not found in the DOM.");
            throw new Error("Could not fetch pokemon");
        } else {
            error.textContent = "";
            error.style.display = "none";
        }
        
        const data = await response.json();
        const imgElement = document.getElementById("pokemonSprite");
        const pokemonSprite = data.sprites.front_default;
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
    }
    catch(error){
        console.error(error);
    }finally{
        loading.style.display = "none";
    }
}
})
