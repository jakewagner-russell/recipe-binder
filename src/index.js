import { createRecipe, loadRecipes, getRecipes } from "./recipes";
import { renderRecipes, renderFilterMenu } from "./views";
import { getFilters, setFilters } from "./filters";
import {
  generateFilterOptionsContainer,
  generateUniqueValuesForSortTypes,
} from "./element-generators/generate-filter-options";
import { sortByEventListeners } from "./sort-by-event-listeners";

//Expose recipes array and filter types
const [recipes, filters] = [getRecipes(), getFilters()];

//Generate unique values for sort type filter options to prevent duplicate filter options
const cuisineTypeArray = generateUniqueValuesForSortTypes({
  recipes: recipes,
  objectKey: "cuisineType",
});

const ingredientsArray = generateUniqueValuesForSortTypes({
  recipes: recipes,
  objectKey: "ingredients",
});

const timeLengthArray = generateUniqueValuesForSortTypes({
  recipes: recipes,
  objectKey: "cookingTime",
  objectKeyTwo: "timeLength",
});

//Toggle the add and remove the 'open' class on the sidebar filter menu and the dark overlay
const toggleSidebarMenuClass = (classListMethod) => {
  const sidebarFilterMenu = document.querySelector(".sidebar-filter-menu");
  const darkOverlay = document.querySelector(".dark-overlay");

  //If the classListMethod argument is 'open'
  if (classListMethod === "open") {
    //Add the open class to the sidebar filter menu and the dark overlay
    sidebarFilterMenu.classList.add("open");
    darkOverlay.classList.add("open");
    //Prevent scrolling on the body element
    document.body.style.overflowY = "hidden";
  } //If the classListMethod argument is 'open'
  else if (classListMethod === "remove") {
    //Remove the open class to the sidebar filter menu and the dark overlay
    sidebarFilterMenu.classList.remove("open");
    darkOverlay.classList.remove("open");
    //Reenable scrolling on the body element
    document.body.style.overflowY = "auto";
  }
};

//Render all recipe cards
renderRecipes();

//When the 'Add New Recipe' button is clicked
document
  .querySelector("#add-new-recipe-button")
  .addEventListener("click", () => {
    //Generate a new recipe card with default values
    createRecipe();
    //Rerender the recipe cards
    renderRecipes();
  });

//When the search icon is clicked
document
  .querySelector(".header__search-icon")
  .addEventListener("click", (e) => {
    //Add the 'open' class on the sidebar filter menu and the dark overlay
    toggleSidebarMenuClass("open");
  });

//When the close button is clicked on the sidebar filter menu
document
  .querySelector(".sidebar-filter-menu__close-btn")
  .addEventListener("click", (e) => {
    //Remove the 'open' class on the sidebar filter menu and the dark overlay
    toggleSidebarMenuClass("remove");
  });

//When something is typed into the 'filter recipes' input
document
  .querySelector(".sidebar-filter-menu__filter-recipe-input")
  .addEventListener("input", (e) => {
    // Filter recipes by the value in the 'filter recipes' input
    setFilters({
      searchText: e.target.value,
    });
    //Rerender the recipe cards
    renderRecipes();
  });

//When the dark overlay is clicked
document.querySelector(".dark-overlay").addEventListener("click", (e) => {
  //Remove the 'open' class on the sidebar filter menu and the dark overlay
  toggleSidebarMenuClass("remove");
});

//Add all event listeners to each sorted by filter options
sortByEventListeners("cuisine", cuisineTypeArray);
sortByEventListeners("cooking-time", timeLengthArray);
sortByEventListeners("ingredient", ingredientsArray);
sortByEventListeners("recently-added");
sortByEventListeners("last-updated");
