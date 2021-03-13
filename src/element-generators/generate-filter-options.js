import {
  RecipeDOMElement,
  constructElementsFromArray,
} from "./recipe-dom-element";
import { getRecipes } from "../recipes";

//Expose recipes array
const recipes = getRecipes();

//Generate the checkbox container of the filter option
const generateFilterOptionsCheckboxContainer = () => {
  //Declare the checkbox element of the filter option
  const filterOptionsCheckboxElObj = new RecipeDOMElement(
    "filterOptionsCheckboxEl",
    "input",
    undefined,
    "sidebar-filter-menu__filter-options-checkbox",
    undefined,
    [
      ["type", "checkbox"],
      ["name", "filter-option"],
    ]
  );

  //Declare the checkmark element of the filter option
  const filterOptionsCheckmarkElObj = new RecipeDOMElement(
    "filterOptionsCheckmarkEl",
    "span",
    undefined,
    "sidebar-filter-menu__filter-options-checkmark"
  );

  //Declare array for and construct the child elements of the checkbox container
  const filterOptionsCheckboxElementsArray = new Array(
    filterOptionsCheckboxElObj,
    filterOptionsCheckmarkElObj
  );

  constructElementsFromArray(filterOptionsCheckboxElementsArray);

  //Declare and construct the checkbox container element
  const filterOptionsCheckboxContainerElObj = new RecipeDOMElement(
    "filterOptionsCheckboxContainerEl",
    "label",
    undefined,
    "sidebar-filter-menu__filter-options-checkbox-container",
    undefined,
    undefined,
    [filterOptionsCheckboxEl, filterOptionsCheckmarkEl]
  );

  filterOptionsCheckboxContainerElObj.constructElement();

  return filterOptionsCheckboxContainerEl;
};

//Generate the filter options container
const generateFilterOptionsContainer = (arrayItem) => {
  //Declare and construct the label for the filter option
  const filterOptionsLabelObj = new RecipeDOMElement(
    "filterOptionsLabel",
    "label",
    `${arrayItem}`,
    "sidebar-filter-menu__filter-options-label",
    undefined,
    ["for", "filter-option"]
  );

  filterOptionsLabelObj.constructElement();

  //Declare and construct the filter options container
  const filterOptionsContainerElObj = new RecipeDOMElement(
    "filterOptionsContainerEl",
    "div",
    undefined,
    "sidebar-filter-menu__filter-options-container",
    undefined,
    undefined,
    [generateFilterOptionsCheckboxContainer(), filterOptionsLabel]
  );

  filterOptionsContainerElObj.constructElement();

  return filterOptionsContainerEl;
};

//Generate unique values for sort type filter options to prevent duplicate filter options
const generateUniqueValuesForSortTypes = ({
  recipes,
  objectKey,
  objectKeyTwo,
}) => {
  //Declare new array variable
  let newArray = [];

  //If the objectKeyTwo argument exists
  if (objectKeyTwo) {
    //Add both stated object key values from each recipe of the recipes array to the newArray variable
    recipes.forEach((item) => {
      newArray.push(item[`${objectKey}`][`${objectKeyTwo}`]);
    });
  } else {
    //Add stated object key values from each recipe of the recipes array to the newArray variable
    recipes.forEach((item) => {
      newArray.push(item[`${objectKey}`]);
    });
  }

  //Create a new unique value set from the newArray variable
  const uniqueValues = [...new Set(newArray)];

  //Flatten nested arrays and sort values alphabetically
  return uniqueValues.flat().sort();
};

export { generateFilterOptionsContainer, generateUniqueValuesForSortTypes };
