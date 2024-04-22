let recipes = [];

function createRecipeCard(recipe) {
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
        <div class="card h-100"
            data-id="${recipe.id}"
            data-cuisine="${recipe.cuisine}"
            data-difficulty="${recipe.difficulty}"
        >
            <img src="${recipe.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${recipe.name}</h5>
                <p class="card-text">${recipe.cuisine}</p>
                <button class="btn btn-primary button-recipe">View Recipe</button>
            </div>
        </div>
    `;
    return card;
}

function addRecipeClickEventListeners() {
    const buttonRecipes = document.querySelectorAll(".button-recipe");
    buttonRecipes.forEach(button => {
        button.addEventListener("click", function() {
            const card = button.closest(".card");
            const id = card.getAttribute("data-id");
            const cuisine = card.getAttribute("data-cuisine");
            const difficulty = card.getAttribute("data-difficulty");
            window.location.href = `detail.html?id=${id}&cuisine=${cuisine}&difficulty=${difficulty}`;
        });
    });
}

function addPreparationTimeIcon(cell, prepTime) {
    const prepIcon = document.createElement('i');
    prepIcon.classList.add('fas');
    prepIcon.classList.add(prepTime <= 30 ? 'fa-clock' : 'fa-hourglass');
    cell.appendChild(prepIcon);
}

function setDifficultyColor(cell, difficulty) {
    switch (difficulty) {
        case 'Easy':
            cell.style.color = 'green';
            break;
        case 'Medium':
            cell.style.color = 'orange';
            break;
        case 'Hard':
            cell.style.color = 'red';
            break;
        default:
            break;
    }
}

function displayRecipeTable(recipes) {
    const tableBody = document.getElementById('recipe-table-body');
    tableBody.innerHTML = ""; // Effacer le contenu actuel du tableau

    recipes.slice(0, 5).forEach(recipe => {
        const row = document.createElement('tr');

        // Nom de la recette
        const nameCell = document.createElement('td');
        nameCell.textContent = recipe.name;
        row.appendChild(nameCell);

        // Note de la recette
        const ratingCell = document.createElement('td');
        ratingCell.textContent = recipe.rating;
        row.appendChild(ratingCell);

        // Temps de préparation
        const prepTimeCell = document.createElement('td');
        prepTimeCell.textContent = recipe.prepTime + ' min';
        addPreparationTimeIcon(prepTimeCell, recipe.prepTime);
        row.appendChild(prepTimeCell);

        // Difficulté de la recette
        const difficultyCell = document.createElement('td');
        difficultyCell.textContent = recipe.difficulty;
        setDifficultyColor(difficultyCell, recipe.difficulty);
        row.appendChild(difficultyCell);

        // Lien vers la page détaillée de la recette
        const detailCell = document.createElement('td');
        const detailLink = document.createElement('a');
        detailLink.textContent = 'Show details';
        detailLink.href = 'detail.html?id=' + recipe.id;
        detailCell.appendChild(detailLink);
        row.appendChild(detailCell);

        tableBody.appendChild(row);
    });
}

function getRecipesFromAPI(url) {
    fetch(url)
        .then(res => res.json())
        .then(json => {
            recipes = json.recipes; // Stocke les recettes récupérées de l'API dans la variable recipes
            recipes.forEach(recipe => {
                const card = createRecipeCard(recipe);
                document.getElementById("card-container").appendChild(card);
            });
            displayRecipeTable(recipes); // Appel la fonction pour afficher le tableau des recettes après les avoir récupérées
            addRecipeClickEventListeners(); 
        })
        .catch(error => console.error("Erreur lors de la récupération des recettes:", error));
}

function filterRecipes(searchTerm) {
    console.log("Recherche en cours avec le terme:", searchTerm);
    const filteredRecipes = recipes.filter(recipe => {
        const recipeName = recipe.name ? recipe.name.toLowerCase() : "";
        const recipeDescription = recipe.description ? recipe.description.toLowerCase() : "";
        return recipeName.includes(searchTerm) || recipeDescription.includes(searchTerm);
    });
    console.log("Recettes filtrées:", filteredRecipes);
    displayRecipeTable(filteredRecipes);
}

// Appeler la fonction pour récupérer les recettes depuis l'API
getRecipesFromAPI('https://dummyjson.com/recipes/');