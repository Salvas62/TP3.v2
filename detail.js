// fonction pour modifier l'url et le texte alternatif de l'image
function setImageTag(container, url, alt) {
  container.src = url;
  container.alt = alt;
}

// fonction pour récupérer les paramètres de l'url et afficher les informations de la recette
function getParams() {
  let params = new URLSearchParams(document.location.search);
  let id = parseInt(params.get("id"));

  // Pour récupérer les données de la recette, 
  fetch('https://dummyjson.com/recipes/' + id)
  .then(res => res.json())
  .then(recipe => {

      // On affiche les informations de la recette
      recipeTitle.innerHTML = recipe.name;
      recipeDifficulty.innerHTML += " " + recipe.difficulty;
      setImageTag(recipeImage, recipe.image, recipe.name);

      // Mettre à jour les autres éléments de la recette
      prepTimeMinutes.innerHTML += " " + recipe.prepTime + " minutes";
      cookTimeMinutes.innerHTML += " " + recipe.cookTime + " minutes";
      servings.innerHTML += " " + recipe.servings;
      cuisine.innerHTML += " " + recipe.cuisine;
      caloriesPerServing.innerHTML += " " + recipe.caloriesPerServing;
      mealType.innerHTML += " " + recipe.mealType;
      rating.innerHTML += " " + recipe.rating;

      // Afficher les ingrédients
      let ingredientsList = recipe.ingredients.map(ingredient => {
          return `<li>${ingredient}</li>`;
      }).join('');
      ingredients.innerHTML = `<ul>${ingredientsList}</ul>`;

      document.getElementById("recipe-instructions").innerHTML = recipe.instructions;

  })
  .catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des données de l\'API :', error);
  });
}

var recipeTitle = document.getElementById("recipe-title");
var recipeDifficulty = document.getElementById("recipe-difficulty");
var recipeImage = document.getElementById("recipe-image");
var prepTimeMinutes = document.getElementById("recipe-prepTime");
var cookTimeMinutes = document.getElementById("recipe-cookTime");
var servings = document.getElementById("recipe-serving");
var cuisine = document.getElementById("recipe-cuisine");
var caloriesPerServing = document.getElementById("recipe-calories");
var mealType = document.getElementById("recipe-type");
var rating = document.getElementById("recipe-rating");
var ingredients = document.getElementById("recipe-ingredients");

getParams();