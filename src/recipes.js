import { v4 as uuid } from "uuid";
import moment from "moment";

//Initialize recipes array
let recipes = [];

//Load recipes from local storage
const loadRecipes = () => {
  //Grab recipes array from local storage
  const recipesJSON = localStorage.getItem("recipes");

  //If the recipes array exist in local storage
  try {
    //Return and parse the JSON data from the recipes array in local storage
    //Otherwise, return an empty array
    return recipesJSON ? JSON.parse(recipesJSON) : [];
  } catch (error) {
    //If there is an array, return an array
    return [];
  }
};

//Set the recipes to return value of loadRecipes
recipes = loadRecipes();

//Save the stringified version of the recipes array to the recipes key in local storage
const saveRecipes = () => {
  localStorage.setItem("recipes", JSON.stringify(recipes));
};

//Create a new recipe
const createRecipe = () => {
  const [id, timestamp] = [uuid(), moment().valueOf()];

  //Add the new recipe to the recipe array with default key values
  recipes.push({
    id: id,
    title: "Your New Recipe",
    instructions: [],
    ingredients: [],
    cuisineType: "Delicious",
    servingSize: 1,
    cookingTime: {
      hours: 0,
      minutes: 0,
      timeLength: "Quick",
    },
    timeCreated: timestamp,
    updatedAt: timestamp,
  });

  //Save the stringified version of the recipes array to the recipes key in local storage
  saveRecipes();
};

//Remove a recipe
const removeRecipe = (id) => {
  //Find the index that corresponds to the recipe being deleted
  const recipeToRemoveIndex = recipes.findIndex((recipe) => recipe.id === id);

  //If the recipe exists in the recipes array
  if (recipeToRemoveIndex > -1) {
    //Remove the recipe from the recipes array
    recipes.splice(recipeToRemoveIndex, 1);
    //Save the stringified version of the recipes array to the recipes key in local storage
    saveRecipes();
  }
};
//Variable to expose the recipes array in other module
const getRecipes = () => recipes;

//Sort recipes by filter options
const sortRecipes = (...sortBy) => {
  //Create array of all cuisine types from the recipes array
  const cuisineTypes = recipes.map((recipe) => recipe.cuisineType);
  //Create array of all ingredients from the recipes array
  const ingredientsArray = recipes.map((recipe) => recipe.ingredients).flat();
  let ingredientIncluded = false;
  let isCuisineType = false;

  //Flatten all nested arrays in the sortBy argument
  let sortByItem = sortBy.flat();

  //Check if item is an ingredient or a cuisine type
  const isIngredientOrCuisineType = (sortItem) => {
    //If the item is an ingredient
    if (ingredientsArray.includes(sortItem)) {
      //Set the ingredientIncluded variable to true
      ingredientIncluded = true;
    }
    //If the item is a cuisine type
    else if (cuisineTypes.includes(sortItem)) {
      //Set the isCuisineType variable to true
      isCuisineType = true;
    }
  };

  //If only one item exists in the the sortByItem array
  if (sortByItem.length === 1) {
    //Convert item to a new string
    sortByItem = sortByItem.join();
    //Check if item is an ingredient or a cuisine type
    isIngredientOrCuisineType(sortByItem);
  }

  //If there is multiple sortBy arguments, check if they are included in any of recipe's ingredients
  if (Array.isArray(sortByItem)) {
    //Loop through each sortBy item
    sortByItem.forEach((item) => {
      //Check if item is an ingredient or a cuisine type
      isIngredientOrCuisineType(item);
    });
  }
  //If isCuisineType is true
  if (isCuisineType) {
    //Filter recipes by cuisine type
    return recipes.filter((recipe) => recipe.cuisineType === sortByItem);
  }
  //If ingredientIncluded is true
  if (ingredientIncluded) {
    //If there is multiple ingredients checked
    if (Array.isArray(sortByItem)) {
      //Filter recipes by checked ingredients
      return recipes.filter((recipe) =>
        sortByItem.every((item) => recipe.ingredients.includes(item))
      );
    } else {
      //Filter recipes by checked ingredient
      return recipes.filter((recipe) =>
        recipe.ingredients.includes(sortByItem)
      );
    }
  }

  //If sortByItem is 'Quick'
  if (sortByItem === "Quick") {
    //Filter recipes by the 'Quick' cooking time length
    return recipes.filter(
      (recipe) => recipe.cookingTime.timeLength === "Quick"
    );
  }

  //If sortByItem is 'Moderate'
  if (sortByItem === "Moderate") {
    //Filter recipes by the 'Moderate' cooking time length
    return recipes.filter(
      (recipe) => recipe.cookingTime.timeLength === "Moderate"
    );
  }

  //If sortByItem is 'Lengthy'
  if (sortByItem === "Lengthy") {
    //Filter recipes by the 'Lengthy' cooking time length
    return recipes.filter(
      (recipe) => recipe.cookingTime.timeLength === "Lengthy"
    );
  }

  //If sortByItem is 'lastUpdated'
  if (sortByItem === "lastUpdated") {
    //Sort recipes by when the recipe was last updated
    return recipes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  //If sortByItem is 'lastCreated'
  if (sortByItem === "lastCreated") {
    //Sort recipes by when the recipe was last updated
    return recipes.sort((a, b) => {
      if (a.timeCreated > b.timeCreated) {
        return -1;
      } else if (a.timeCreated < b.timeCreated) {
        return 1;
      } else {
        return 0;
      }
    });
  }
};

//Update recipe with any changes
const updateRecipe = (id, updates, index) => {
  //Find the recipe with the specific id
  const recipe = recipes.find((recipe) => recipe.id === id);

  //Update the cooking time length value by the values of cooking time minutes and hours
  const updateCookingTimeLength = () => {
    const [minutes, hours] = [
      recipe.cookingTime.minutes,
      recipe.cookingTime.hours,
    ];

    //If the cooking time is less than or equal to 30 minutes, set timeLength to 'Quick'
    if (minutes <= 30 && hours === 0) {
      recipe.cookingTime.timeLength = "Quick";
    } //If the cooking time is gret than 30 minutes and less than or equal to 59 minutes, set timeLength to 'Moderate'
    else if (minutes > 30 && minutes <= 59 && hours === 0) {
      recipe.cookingTime.timeLength = "Moderate";
    } //If the cooking time is equal to or over an hour, set timeLength to 'Lengthy'
    else if (hours >= 1) {
      recipe.cookingTime.timeLength = "Lengthy";
    }
  };

  //Return function if recipe does not exist
  if (!recipe) {
    return;
  }

  //If the type of updated value in the title key is a string
  if (typeof updates.title === "string") {
    //Replace the value of the preexisting title key value to the updated one
    recipe.title = updates.title;
  }

  //If the type of updated value in the cuisineType key is a string
  if (typeof updates.cuisineType === "string") {
    //Replace the value of the preexisting cuisineType key value to the updated one
    recipe.cuisineType = updates.cuisineType;
  }

  //If the type of updated value in the servingSize key is a number
  if (typeof updates.servingSize === "number") {
    //Replace the value of the preexisting servingSize key value to the updated one
    recipe.servingSize = updates.servingSize;
  }

  //If there is an updated value in the cookingTime key
  if (updates.cookingTime !== undefined) {
    //If the type of updated value in the minutes key is a number
    if (typeof updates.cookingTime.minutes === "number") {
      //Replace the value of the preexisting minutes key value to the updated one
      recipe.cookingTime.minutes = updates.cookingTime.minutes;
      //Update the cooking time length value by the updated minutes key value
      updateCookingTimeLength();
    }

    if (typeof updates.cookingTime.hours === "number") {
      //Replace the value of the preexisting hours key value to the updated one
      recipe.cookingTime.hours = updates.cookingTime.hours;
      //Update the cooking time length value by the updated hours key value
      updateCookingTimeLength();
    }
  }

  //Generate an updated timestamp for the updatedAt key value
  recipe.updatedAt = moment().valueOf();
  //Save the stringified version of the recipes array to the recipes key in local storage
  saveRecipes();
};

export {
  createRecipe,
  loadRecipes,
  getRecipes,
  removeRecipe,
  sortRecipes,
  updateRecipe,
  saveRecipes,
};
