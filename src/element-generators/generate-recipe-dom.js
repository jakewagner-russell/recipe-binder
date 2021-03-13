import moment from "moment";
import { getRecipes } from "../recipes";
import {
  RecipeDOMElement,
  constructElementsFromArray,
} from "./recipe-dom-element";

//Expose the recipes array
const recipes = getRecipes();

//Determine if the recipe description item name needs to be plural
const getPlural = (number, word) => {
  //If the number equals one, do not pluralize
  if (number === 1) {
    return word;
  } else {
    //Otherwise, pluralize
    return `${word}s`;
  }
};

//Generate the number elements for the recipe card drop down description
const createRecipeCardDropDownNumberElements = (recipe) => {
  //Define the cooking time hours element for the recipe card drop down description
  const dropDownCookingTimeHoursNumberElObj = new RecipeDOMElement(
    "dropDownCookingTimeHoursNumberEl",
    "strong",
    recipe.cookingTime.hours,
    "main__recipe-card-drop-down__cooking-time-hours-number"
  );
  //Define the cooking time minutes element for the recipe card drop down description
  const dropDownCookingTimeMinutesNumberElObj = new RecipeDOMElement(
    "dropDownCookingTimeMinutesNumberEl",
    "strong",
    recipe.cookingTime.minutes,
    "main__recipe-card-drop-down__cooking-time-minutes-number"
  );
  //Define the serving size number element for the recipe card drop down description
  const dropDownServingsNumberElObj = new RecipeDOMElement(
    "dropDownServingsNumberEl",
    "strong",
    recipe.servingSize,
    "main__recipe-card-drop-down__servings-number"
  );

  //Define the ingredient number element for the recipe card drop down description
  const dropDownIngredientsNumberElObj = new RecipeDOMElement(
    "dropDownIngredientsNumberEl",
    "strong",
    recipe.ingredients.length,
    "main__recipe-card-drop-down__ingredients-number"
  );

  //Declare the array for and construct span child elements for the recipe card drop down description
  const recipeCardDropDownNumberElementsArray = new Array(
    dropDownCookingTimeHoursNumberElObj,
    dropDownCookingTimeMinutesNumberElObj,
    dropDownServingsNumberElObj,
    dropDownIngredientsNumberElObj
  );

  constructElementsFromArray(recipeCardDropDownNumberElementsArray);
};

//Generate the span elements for the recipe card drop down description
const createRecipeCardDropDownSpanElements = (recipe) => {
  //Expose the number elements for the recipe card drop down description
  createRecipeCardDropDownNumberElements(recipe);

  //Define the cooking time hours span element for the recipe card drop down description
  const dropDownCookingTimeHoursSpanObj = new RecipeDOMElement(
    "dropDownCookingTimeHoursSpan",
    "span",
    undefined,
    "main__recipe-card-drop-down__cooking-time-hours",
    " Hours",
    undefined,
    dropDownCookingTimeHoursNumberEl
  );

  //Define the cooking time minutes span element for the recipe card drop down description
  const dropDownCookingTimeMinutesSpanObj = new RecipeDOMElement(
    "dropDownCookingTimeMinutesSpan",
    "span",
    undefined,
    "main__recipe-card-drop-down__cooking-time-minutes",
    " Minutes",
    undefined,
    dropDownCookingTimeMinutesNumberEl
  );

  //Declare the array for and construct paragraph child elements for the recipe card drop down description
  const recipeCardDropDownSpanElementArray = new Array(
    dropDownCookingTimeHoursSpanObj,
    dropDownCookingTimeMinutesSpanObj
  );

  constructElementsFromArray(recipeCardDropDownSpanElementArray);
};

//Generate the paragraph elements for the recipe card drop down description
const createRecipeCardDropDownPElements = (recipe) => {
  //Expose the number elements for the recipe card drop down description
  createRecipeCardDropDownSpanElements(recipe);

  //Define the cooking time paragraph element for the recipe card drop down description
  const dropDownCookingTimePObj = new RecipeDOMElement(
    "dropDownCookingTimeP",
    "p",
    undefined,
    "main__recipe-card-drop-down__cooking-time",
    undefined,
    undefined,
    [dropDownCookingTimeHoursSpan, dropDownCookingTimeMinutesSpan]
  );

  //Define the serving amount paragraph element for the recipe card drop down description
  const dropDownServingAmountPObj = new RecipeDOMElement(
    "dropDownServingAmountP",
    "p",
    undefined,
    "main__recipe-card-drop-down__serving-amount",
    getPlural(recipe.servingSize, " Serving"),
    undefined,
    dropDownServingsNumberEl
  );

  //Define the ingredient amount paragraph element for the recipe card drop down description
  const dropDownIngredientAmountPObj = new RecipeDOMElement(
    "dropDownIngredientAmountP",
    "p",
    undefined,
    "main__recipe-card-drop-down__ingredient-amount",
    getPlural(recipe.ingredients.length, " Ingredient"),
    undefined,
    dropDownIngredientsNumberEl
  );

  //Declare the array for and construct the container child elements for the recipe card drop down description
  const recipeCardDropDownPArray = new Array(
    dropDownCookingTimePObj,
    dropDownServingAmountPObj,
    dropDownIngredientAmountPObj
  );

  constructElementsFromArray(recipeCardDropDownPArray);
};

//Generate the 'See Full Recipe' button element for the recipe card drop down description
const createRecipeCardDropDownButtonElement = () => {
  //Define and construct the spoon icon element for the 'See Full Recipe' button element
  //of the recipe card drop down description
  const dropDownButtonSpoonIconObj = new RecipeDOMElement(
    "dropDownButtonSpoonIcon",
    "i",
    undefined,
    ["fas", "fa-utensil-spoon", "main__recipe-card-drop-down__spoon"]
  );

  dropDownButtonSpoonIconObj.constructElement();

  //Define and construct the 'See Full Recipe' button element of the recipe card drop down description
  const dropDownButtonElObj = new RecipeDOMElement(
    "dropDownButtonEl",
    "button",
    undefined,
    "main__recipe-card-drop-down__button",
    "See Full Recipe",
    undefined,
    dropDownButtonSpoonIcon
  );

  dropDownButtonElObj.constructElement();

  return dropDownButtonEl;
};

//Generate the container element for the recipe card drop down description
const createRecipeCardDropDownContainerElements = (recipe) => {
  //Expose the number elements for the recipe card drop down description
  createRecipeCardDropDownPElements(recipe);

  //Define and construct the text content element of the recipe card drop down description
  const dropDownTextContentElObj = new RecipeDOMElement(
    "dropDownTextContentEl",
    "div",
    undefined,
    "main__recipe-card-drop-down__text-content",
    undefined,
    undefined,
    [dropDownIngredientAmountP, dropDownServingAmountP, dropDownCookingTimeP]
  );

  dropDownTextContentElObj.constructElement();

  //Define and construct the recipe link element of the recipe card drop down description
  const dropDownRecipeLinkElObj = new RecipeDOMElement(
    "dropDownRecipeLinkEl",
    "a",
    undefined,
    "main__recipe-card-link",
    undefined,
    ["href", `/edit.html#${recipe.id}`],
    createRecipeCardDropDownButtonElement()
  );

  dropDownRecipeLinkElObj.constructElement();

  //Define and construct the wrapper element of the recipe card drop down description
  const dropDownWrapperElObj = new RecipeDOMElement(
    "dropDownWrapperEl",
    "div",
    undefined,
    ["main__recipe-card-drop-down__wrapper", "wrapper"],
    undefined,
    undefined,
    [dropDownTextContentEl, dropDownRecipeLinkEl]
  );

  dropDownWrapperElObj.constructElement();

  //Define and construct the container element of the recipe card drop down description
  const dropDownElObj = new RecipeDOMElement(
    "dropDownEl",
    "div",
    undefined,
    "main__recipe-card-drop-down",
    undefined,
    undefined,
    dropDownWrapperEl
  );

  dropDownElObj.constructElement();

  return dropDownEl;
};

//Generate the span elements for the recipe card main description
const createRecipeCardMainSectionSpanElements = (recipe) => {
  //Define the cooking time description element of the recipe card main description
  const cookingTimeDescriptionSpanObj = new RecipeDOMElement(
    "cookingTimeDescriptionSpan",
    "span",
    recipe.cookingTime.timeLength,
    "main__cooking-time-description"
  );

  //Define the description divider element of the recipe card main description
  const descriptionDividerSpanObj = new RecipeDOMElement(
    "descriptionDividerSpan",
    "span",
    "•",
    "main__recipe-description-divider"
  );

  //Define the cuisine description span element of the recipe card main description
  const cuisineDescriptionSpanObj = new RecipeDOMElement(
    "cuisineDescriptionSpan",
    "span",
    recipe.cuisineType,
    "main__cuisine-description"
  );

  //Declare the array for and construct the text content child elements for the recipe card main title & description
  const mainSectionSpanElementArray = new Array(
    descriptionDividerSpanObj,
    cuisineDescriptionSpanObj,
    cookingTimeDescriptionSpanObj
  );

  constructElementsFromArray(mainSectionSpanElementArray);
};

//Generate the text content elements for the recipe card main title & description
const createRecipeCardMainSectionTextContentElements = (recipe) => {
  //Expose the span elements for the recipe card main description
  createRecipeCardMainSectionSpanElements(recipe);

  //Define the recipe title element of the recipe card main title
  const recipeTitleElObj = new RecipeDOMElement(
    "recipeTitleEl",
    "h3",
    recipe.title,
    "main__recipe-title"
  );

  //Define the recipe description element of the recipe card main description
  const recipeDescriptionElObj = new RecipeDOMElement(
    "recipeDescriptionEl",
    "p",
    undefined,
    "main__recipe-description",
    undefined,
    undefined,
    [cuisineDescriptionSpan, descriptionDividerSpan, cookingTimeDescriptionSpan]
  );

  //Declare the array for and construct the text content container child elements for the recipe card main title & description
  const mainSectionTextContentElementsArray = new Array(
    recipeTitleElObj,
    recipeDescriptionElObj
  );

  constructElementsFromArray(mainSectionTextContentElementsArray);

  //Define and construct the text content container element of the recipe card main description
  const mainSectionTextContentContainerElObj = new RecipeDOMElement(
    "mainSectionTextContentContainerEl",
    "div",
    undefined,
    "main__recipe-card__text-content",
    undefined,
    undefined,
    [recipeTitleEl, recipeDescriptionEl]
  );

  mainSectionTextContentContainerElObj.constructElement();
};

//Generate the down arrow icon element for the recipe card main title & description
const createRecipeCardDownArrowIconElement = () => {
  //Define and construct the down arrow icon element of the recipe card main title & description
  const downArrowIconElObj = new RecipeDOMElement(
    "downArrowIconEl",
    "i",
    undefined,
    ["fas", "fa-caret-down", "main__recipe-card-down-arrow-icon"]
  );

  downArrowIconElObj.constructElement();

  return downArrowIconEl;
};

//Generate the container elements for the recipe card main title & description
const createRecipeCardMainSectionContainerElements = (recipe) => {
  //Expose the text content elements for the recipe card main title & description
  createRecipeCardMainSectionTextContentElements(recipe);

  //Define and construct the wrapper element of the recipe card main title & description
  const mainSectionWrapperElObj = new RecipeDOMElement(
    "mainSectionWrapperEl",
    "div",
    undefined,
    ["main__recipe-card-main-section__wrapper", "wrapper"],
    undefined,
    undefined,
    [mainSectionTextContentContainerEl, createRecipeCardDownArrowIconElement()]
  );

  mainSectionWrapperElObj.constructElement();

  //Define and construct the container element of the recipe card main title & description
  const mainSectionElObj = new RecipeDOMElement(
    "mainSectionEl",
    "div",
    undefined,
    "main__recipe-card-main-section",
    undefined,
    undefined,
    mainSectionWrapperEl
  );

  mainSectionElObj.constructElement();

  return mainSectionEl;
};

//Generate recipe card element
const createRecipeCard = (recipe) => {
  //Define and construct the recipe card element
  const recipeCardElObj = new RecipeDOMElement(
    "recipeCardEl",
    "div",
    undefined,
    "main__recipe-card",
    undefined,
    undefined,
    [
      createRecipeCardMainSectionContainerElements(recipe),
      createRecipeCardDropDownContainerElements(recipe),
    ]
  );

  recipeCardElObj.constructElement();

  return recipeCardEl;
};

//Generate the DOM for recipe cards
const generateRecipeDOM = (recipe) => {
  const recipeCard = createRecipeCard(recipe);

  //When clicked, toggle the opening of the recipe card drop down description
  recipeCard.addEventListener("click", () => {
    recipeCard.classList.toggle("open");
  });

  return recipeCard;
};

export { generateRecipeDOM };
