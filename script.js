// let ingredients = [];

// function addIngredient() {
//   const input = document.getElementById('ingredientInput');
//   const ingredient = input.value.trim().toLowerCase();
//   if (ingredient && !ingredients.includes(ingredient)) {
//     ingredients.push(ingredient);
//     updateIngredientList();
//   }
//   input.value = '';
// }

// function updateIngredientList() {
//   const list = document.getElementById('ingredientList');
//   list.innerHTML = '';
//   ingredients.forEach(ing => {
//     const li = document.createElement('li');
//     li.textContent = ing;
//     list.appendChild(li);
//   });
// }

// function findRecipes() {
//   const recipes = [
//     {
//       name: "Pasta with Tomato Sauce",
//       ingredients: ["pasta", "tomato", "garlic"]
//     },
//     {
//       name: "Omelette",
//       ingredients: ["eggs", "cheese", "milk"]
//     },
//     {
//       name: "Grilled Cheese",
//       ingredients: ["bread", "cheese", "butter"]
//     }
//   ];

//   const results = recipes.filter(recipe =>
//     recipe.ingredients.every(ing => ingredients.includes(ing))
//   );

//   const recipesDiv = document.getElementById('recipes');
//   recipesDiv.innerHTML = results.length
//     ? results.map(r => `<p>${r.name}</p>`).join('')
//     : "<p>No recipes found.</p>";
// }


let ingredients = [];

function addIngredient() {
  const input = document.getElementById('ingredientInput');
  const ingredient = input.value.trim().toLowerCase();
  if (ingredient && !ingredients.includes(ingredient)) {
    ingredients.push(ingredient);
    updateIngredientList();
  }
  input.value = '';
}

function updateIngredientList() {
  const list = document.getElementById('ingredientList');
  list.innerHTML = '';
  ingredients.forEach(ing => {
    const li = document.createElement('li');
    li.textContent = ing;
    list.appendChild(li);
  });
}

async function findRecipes() {
  const apiKey = "0163cd50a21847e28a0bc7200ec846eb"; 
  const query = ingredients.join(',');
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=5&apiKey=${apiKey}`;

  const recipesDiv = document.getElementById('recipes');
  recipesDiv.innerHTML = "<p>Searching for recipes...</p>";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      recipesDiv.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    // Show results
    console.log(data)
    recipesDiv.innerHTML = data.map(recipe => `
      <div class="recipe-card">
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" width="200">
        <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
        <p>Missing Ingredients: ${recipe.missedIngredientCount}</p>
        <a href="https://spoonacular.com/recipes/${recipe.title.toLowerCase().replace(/ /g, '-')}-${recipe.id}" target="_blank">View Full Recipe</a>
      </div>
    `).join('');
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipesDiv.innerHTML = "<p>Failed to load recipes. Try again later.</p>";
  }
}
