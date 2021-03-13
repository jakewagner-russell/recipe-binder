import moment from "moment";
import { getFilters } from "./filters";
import { getRecipes, sortRecipes } from "./recipes";
import { generateRecipeDOM } from "./element-generators/generate-recipe-dom";
import { RecipeDOMElement } from "./element-generators/recipe-dom-element";
import { generateEmptyMessage } from "./element-generators/generate-empty-message";
import {
  generateFilterOptionsContainer,
  generateUniqueValuesForSortTypes,
} from "./element-generators/generate-filter-options";

//Expose the recipes array
const recipes = getRecipes();

//Render recipe cards
const renderRecipes = () => {
  const recipeContainerEl = document.querySelector(".main__recipe-container");

  //Expose filters object
  const filters = getFilters();

  //Recipes sorted by the value defined in the sortedBy key of the filters object
  const sortedRecipes = sortRecipes(filters.sortedBy);

  //Recipes filtered by the text content in the filter recipe input
  const filteredRecipes = sortedRecipes.filter((recipe) =>
    JSON.stringify(Object.values(recipe))
      .toLowerCase()
      .includes(filters.searchText.toLowerCase())
  );

  //Reset the recipe container element grid template rows to fit the empty message container
  const emptyMessageChangeRowHeight = () =>
    (recipeContainerEl.style.gridTemplateRows = "repeat(auto-fit, 100%)");

  //Clear the recipe container element's inner HTML
  recipeContainerEl.innerHTML = "";

  //If no recipes in the recipes array exist
  if (recipes.length === 0) {
    //Reset the recipe container element grid template rows to fit the empty message container
    emptyMessageChangeRowHeight();
    //Append the generated empty message to the recipe container element
    recipeContainerEl.appendChild(generateEmptyMessage(true));
  } else {
    //If there are recipes that meet the filter criteria
    if (filteredRecipes.length > 0) {
      //Reset the recipe container element grid template rows to it's default styling
      recipeContainerEl.style.removeProperty("grid-template-rows");
      //Loop through each filtered recipe
      filteredRecipes.forEach((recipe) => {
        //Generate the DOM for recipe cards and append them to the recipe container element
        recipeContainerEl.appendChild(generateRecipeDOM(recipe));
      });
    } else {
      //Reset the recipe container element grid template rows to fit the empty message container
      emptyMessageChangeRowHeight();
      //Append the generated empty message that no filter criteria matches exist to the recipe container element
      recipeContainerEl.appendChild(generateEmptyMessage(false));
    }
  }
};

//Render the sidebar filter menu
const renderFilterMenu = (array) => {
  //Declare and construct the wrapper element for the filter options column element
  const filterOptionsColWrapperElObj = new RecipeDOMElement(
    "filterOptionsColWrapperEl",
    "div",
    undefined,
    ["sidebar-filter-menu__filter-options-col-wrapper", "wrapper"]
  );

  filterOptionsColWrapperElObj.constructElement();

  const filterOptionsColEl = document.querySelector(
    ".sidebar-filter-menu__filter-options-col"
  );

  //Loop through each item in the array argument
  array.forEach((item) => {
    //Append the generated filter option to the filter options column wrapper element
    filterOptionsColWrapperEl.appendChild(generateFilterOptionsContainer(item));
  });

  //Append the wrapper element to the filter options column element
  filterOptionsColEl.appendChild(filterOptionsColWrapperEl);

  return filterOptionsColEl;
};

export { generateRecipeDOM, renderRecipes, renderFilterMenu };
