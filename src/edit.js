import { getRecipes } from "./recipes";
import {
  renderEditItems,
  generateNewCard,
  generateDeleteRecipeButton,
} from "./element-generators/generate-edit-items";

//Expose recipes array
const recipeArray = getRecipes();
const recipeId = location.hash.substring(1);

//Get specific recipe that matches the recipe id
const recipe = recipeArray.find((recipe) => recipe.id === recipeId);

//Render all recipe cards on the edit page
renderEditItems(recipe);

//When the 'Add New Step' button is clicked
document.querySelector("#main__add-new-step").addEventListener("click", () => {
  //Generate a new step card
  generateNewCard(recipe, "instructions");
});

//When the 'Add New Ingredient' button is clicked
document
  .querySelector("#main__add-new-ingredient")
  .addEventListener("click", () => {
    //Generate a new ingredient card
    generateNewCard(recipe, "ingredients");
  });

//When the 'Delete Recipe' button is clicked
document
  .querySelector(".main__delete-button")
  .addEventListener("click", (e) => {
    //Remove recipe from the recipes array
    generateDeleteRecipeButton(recipe);
  });
