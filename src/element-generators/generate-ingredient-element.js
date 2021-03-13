import {
  RecipeDOMElement,
  constructElementsFromArray,
} from "./recipe-dom-element";

//Generate buttons for the ingredient element
const generateIngredientButtons = () => {
  //Declare and construct the remove button minus icon element for ingredient
  const ingredientRemoveButtonMinusIconElObj = new RecipeDOMElement(
    "ingredientRemoveButtonMinusIconEl",
    "i",
    undefined,
    ["fas", "fa-minus-circle", "main__ingredient-remove-button-minus-icon"]
  );

  ingredientRemoveButtonMinusIconElObj.constructElement();

  //Declare the remove button element for ingredient
  const ingredientRemoveButtonElObj = new RecipeDOMElement(
    "ingredientRemoveButtonEl",
    "button",
    undefined,
    "main__ingredient-remove-button",
    "Remove",
    undefined,
    ingredientRemoveButtonMinusIconEl
  );

  //Declare the edit icon element for ingredient
  const ingredientEditIconElObj = new RecipeDOMElement(
    "ingredientEditIconEl",
    "i",
    undefined,
    ["fas", "fa-edit", "main__ingredient-edit-icon"]
  );

  //Declare the array for and construct button container child elements for ingredient
  const ingredientButtonContainerElementsArray = new Array(
    ingredientRemoveButtonElObj,
    ingredientEditIconElObj
  );

  constructElementsFromArray(ingredientButtonContainerElementsArray);

  //Declare and construct the button container element for ingredient
  const ingredientButtonContainerElObj = new RecipeDOMElement(
    "ingredientButtonContainerEl",
    "div",
    undefined,
    "main__ingredient-button-container",
    undefined,
    undefined,
    [ingredientRemoveButtonEl, ingredientEditIconEl]
  );

  ingredientButtonContainerElObj.constructElement();

  return ingredientButtonContainerEl;
};

//Generate the ingredient element
const generateIngredientElement = (recipe, index) => {
  //Declare and construct the span element for ingredient
  const ingredientTypeSpanObj = new RecipeDOMElement(
    "ingredientTypeSpan",
    "span",
    recipe.ingredients[index],
    "main__ingredient-type",
    undefined,
    ["contenteditable", "false"]
  );

  ingredientTypeSpanObj.constructElement();

  //Declare and construct the wrapper element for ingredient
  const ingredientWrapperElObj = new RecipeDOMElement(
    "ingredientWrapperEl",
    "div",
    undefined,
    ["main__ingredient-wrapper", "wrapper"],
    undefined,
    undefined,
    [ingredientTypeSpan, generateIngredientButtons()]
  );

  ingredientWrapperElObj.constructElement();

  //Declare and construct the ingredient container element
  const ingredientContainerElObj = new RecipeDOMElement(
    "ingredientContainerEl",
    "div",
    undefined,
    ["main__ingredient-container", "display-mode"],
    undefined,
    undefined,
    ingredientWrapperEl
  );

  ingredientContainerElObj.constructElement();

  return ingredientContainerEl;
};

export { generateIngredientButtons, generateIngredientElement };
