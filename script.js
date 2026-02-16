

// select your HTML element using your IDs
const nameInput = document.getElementById("Name");
const emailInput = document.getElementById("Email");

// select the form inside the div with id ="form"
const form = document.querySelector("form");

// LOGIN FUNCTION
function loginUser(event) {
    event.preventDefault();

    const Name = nameInput.value.trim();
    const Email = emailInput.value.trim();

//validation
if (Name === "" || Email === "") {
    alert("Please eneter both your Name and Email!");
    return;
}
// Save user data in localStorage
localStorage.setItem("userName", Name);
localStorage.setItem("userEmail", Email);

alert("Login successful! Welcome" + Name);

// Redirect to recipes page after login
window.location.href = "recipes.html";

}

// Add event listener to the form submit
if (form && nameInput && emailInput)
form.addEventListener("submit", loginUser);

//add-recipe
// Get form and input elements
const addForm = document.getElementById("addRecipeForm");
if (addForm) {
const name2Input = document.getElementById("NameOfFood");
const imageInput = document.getElementById("Image");
const descInput = document.getElementById("Description");
const eatenWithInput = document.getElementById("EatenWith");
const ingredientsInput = document.getElementById("Ingredient");

// Function to handle form submit
addForm.addEventListener("submit", function(event) {
    event.preventDefault();

// convert image file to base64 so we can store it in localstorage
const file = imageInput.files[0];
const reader = new FileReader();

reader.onload = function() {
    const recipe = {
        name2: name2Input.value.trim(),
        Image: reader.result, // Base64 string
        description: descInput.value.trim(),
        eatenWith: eatenWithInput.value.trim(),
        ingredients: ingredientsInput.value.trim().split(",").map(i => i.trim())
    };
// Get existing recipes from localStorage
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

//add the new recipe
recipes.push(recipe);

// save back to localstorage
localStorage.setItem("recipes", JSON.stringify(recipes));

alert("recipe added successfully!");

// Clear form
addForm.reset();

//Redirect to recipes page
window.location.href = "recipes.html";
};
if (file) {
    reader.readAsDataURL(file); // convert image to base64

} else {
    alert("please upload an image!");
}
});
 }

 // Function to display recipes on the recipes page
function displayRecipes() {
    const dynamicRecipes = document.getElementById("dynamicRecipes");
    if (!dynamicRecipes) return;

    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    dynamicRecipes.innerHTML = "";

    recipes.forEach(recipe => {
        const recipeDiv = document.createElement("div");
        recipeDiv.className = "recipe";

        recipeDiv.innerHTML = `
            <h2>${recipe.name2}</h2>
            <img src="${recipe.Image}" alt="${recipe.name2}" width="300">
            <p><strong>Description:</strong> ${recipe.description}</p>
            <p><strong>Eaten With:</strong> ${recipe.eatenWith}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
            <hr>
        `;

        dynamicRecipes.appendChild(recipeDiv);
    });
}

// Call displayRecipes when the page loads
window.addEventListener("load", displayRecipes);