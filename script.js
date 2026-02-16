

// select your HTML element using your IDs
const nameInput = document.getElementById("Name");
const emailInput = document.getElementById("Email");

// select the form inside the div with id ="form"
const form = document.querySelector("#loginForm");

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
form.addEventListener("submit", loginUser);

//add-recipe
// Get form and input elements
const addForm = document.getElementById("addRecipeForm");
const name2Input = document.getElementById("NameOfFood");
const imageInput = document.getElementById("Image");
const descInput = document.getElementById("Description");
const eatenWithInput = document.getElementById("EatenWith");
const ingredientsInput = document.getElementById("Ingredient");

// Function to handle form submit
addForm.addEventListener("submit", function(event) {
    event.preventDefault();

// convert image file to base64 so we can store it in localstorage
const file = imageInpute.files[0];
const reader = new FileReader();

reader.onload = function() {
    const recipe ={
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