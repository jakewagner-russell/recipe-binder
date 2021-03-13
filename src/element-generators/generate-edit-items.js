import { getRecipes, saveRecipes } from "../recipes";
import { renderGeneratedCards } from "./render-generated-cards";
import moment from "moment";

//Expose recipes
const recipes = getRecipes();

//Generate new recipe cards for individual steps, ingredients, and recipe details
const generateNewCard = (recipe, elementArray) => {
  let elArray;

  //Set elArray value to the array value of the recipe object key value
  if (elementArray === "instructions") {
    elArray = recipe.instructions;
  } else if (elementArray === "ingredients") {
    elArray = recipe.ingredients;
  }

  //Add default array item to elArray
  elArray.push("Hover over this and click to edit!");

  //Set updated timestamp
  recipe.updatedAt = moment().valueOf();

  //Save generated recipe card to the recipes array in local storage
  saveRecipes();

  //Rerender the edit page
  renderEditItems(recipe);
};

//Generate the delete button for the recipe
const generateDeleteRecipeButton = (recipe) => {
  //Find the index number of the recipe in the recipes array
  const recipeIndex = recipes.indexOf(recipe);

  //Remove recipe from the recipes array
  recipes.splice(recipeIndex, 1);

  //Save changes to the recipes array in local storage
  saveRecipes();

  //Return user to the home page
  location.href = "/index.html";
};

//Generate the last updated timestamp for the last updated recipe card
const generateLastUpdated = (recipe) => {
  document.querySelector(
    ".main__recipe-detail-last-updated-number"
  ).textContent = `${moment(recipe.updatedAt).fromNow()}`;
};

//Render all recipe cards on the edit page
const renderEditItems = (recipe, index) => {
  //Render the cuisine type card
  renderGeneratedCards({
    recipe: recipe,
    index: index,
    elementType: "cuisine",
  });

  //Render the serving size card
  renderGeneratedCards({
    recipe: recipe,
    index: index,
    elementType: "serving-size",
  });

  //Render the cooking time card
  renderGeneratedCards({
    recipe: recipe,
    index: index,
    elementType: "cooking-time",
  });

  //Render the recipe title card
  renderGeneratedCards({
    recipe: recipe,
    index: index,
    elementType: "recipe-title",
  });

  //Render the instruction cards
  renderGeneratedCards({
    recipe: recipe,
    index: index,
    elementType: "step",
    elementArray: "instructions",
  });

  //Render the ingredient cards
  renderGeneratedCards({
    recipe: recipe,
    index: index,
    elementType: "ingredient",
    elementArray: "ingredients",
  });

  //Render the last updated timestamp
  generateLastUpdated(recipe);
};

export {
  renderEditItems,
  generateNewCard,
  generateDeleteRecipeButton,
  generateLastUpdated,
};
