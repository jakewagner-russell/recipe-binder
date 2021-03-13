import {
  generateIngredientButtons,
  generateIngredientElement,
} from "./generate-ingredient-element";
import {
  generateStepRemoveButton,
  generateStepElement,
} from "./generate-step-element";
import { saveRecipes, updateRecipe } from "../recipes";
import { renderEditItems, generateLastUpdated } from "./generate-edit-items";
import moment from "moment";

//Render the edit page recipe detail cards with event listeners
const renderGeneratedCards = ({ recipe, index, elementType, elementArray }) => {
  let elArray;
  const recipeId = location.hash.substring(1);

  //Add event listeners
  const renderEventListeners = (index) => {
    let elType, textContentEl, textContentElTwo, removeButtonEl;

    //Set initial values for the variables above by which element type has been passed in
    if (elementType === "step") {
      elType = generateStepElement(recipe, index);
      textContentEl = stepTextContentEl;
      removeButtonEl = stepRemoveButtonEl;
    } else if (elementType === "ingredient") {
      elType = generateIngredientElement(recipe, index);
      textContentEl = ingredientTypeSpan;
      removeButtonEl = ingredientRemoveButtonEl;
    } else if (elementType === "recipe-title") {
      elType = document.querySelector(".main__recipe-title-container");
      textContentEl = document.querySelector(".main__recipe-title-input");
      textContentEl.textContent = recipe.title;
    } else if (elementType === "cuisine") {
      elType = document.querySelector("#main__cuisine-container");
      textContentEl = document.querySelector(
        ".main__recipe-detail-cuisine-type"
      );
      textContentEl.textContent = recipe.cuisineType;
    } else if (elementType === "serving-size") {
      elType = document.querySelector("#main__serving-size-container");
      textContentEl = document.querySelector(
        ".main__recipe-detail-serving-size-number"
      );
      textContentEl.value = recipe.servingSize;
      textContentEl.disabled = true;
    } else if (elementType === "cooking-time") {
      elType = document.querySelector("#main__cooking-time-container");
      textContentEl = document.querySelector(
        ".main__recipe-detail-cooking-time-hours-number"
      );
      textContentEl.disabled = true;
      textContentEl.value = recipe.cookingTime.hours;
      textContentElTwo = document.querySelector(
        ".main__recipe-detail-cooking-time-minutes-number"
      );
      textContentElTwo.value = recipe.cookingTime.minutes;
      textContentElTwo.disabled = true;
    }

    let isTextContentClicked = false;

    //Toggle the editability of text content elements
    const makeContentEditable = (booleanType, textContentElementVariable) => {
      const textContentElement = textContentElementVariable;
      //If the element type is 'ingredient', 'recipe-title', or 'cuisine' (text content elements that are spans)
      if (elementType !== "serving-size" && elementType !== "cooking-time") {
        //Set the element's contentEditable boolean value to the boolean type argument
        textContentElement.setAttribute("contenteditable", `${booleanType}`);
      } else {
        //If the element type is 'serving-size' or 'cooking-time' (text content elements that are input elements)
        //Enable or disable the element based on the opposite of the boolean type passed in
        textContentElement.disabled = !booleanType;
      }
    };

    //Toggle the display mode and edit mode classes
    const toggleDisplayModes = () => {
      elType.classList.toggle("display-mode");
      elType.classList.toggle("edit-mode");
    };

    //Update any changes made to any of the text content elements
    const updateChanges = (recipe) => {
      isTextContentClicked = false;
      recipe.updatedAt = moment().valueOf();
      saveRecipes();
      generateLastUpdated(recipe);
    };

    //Add click event listeners
    const clickEventListeners = (textContentElementVariable) => {
      const textContentElement = textContentElementVariable;

      //When the mouse is clicked down, set isTextContent clicked to true
      textContentElement.addEventListener("mousedown", (e) => {
        isTextContentClicked = true;
      });

      //When the mouse click is released, set isTextContent clicked to false
      textContentElement.addEventListener("mouseup", (e) => {
        isTextContentClicked = false;
      });

      //On the body of the page, when clicked
      document.body.addEventListener("click", (e) => {
        //If the element type is 'cuisine', 'serving-size', 'cooking-time'
        if (
          elementType === "cuisine" ||
          elementType === "serving-size" ||
          elementType === "cooking-time"
        ) {
          //If the generated element from element type has the 'edit-mode' class and
          //is been clicked outside of the element container (with a unique id attribute)
          //and the text content is not being clicked
          if (
            elType.classList.contains("edit-mode") &&
            !e.target.closest(`#main__${elementType}-container`) &&
            isTextContentClicked === false
          ) {
            console.log(e.target);
            //Toggle display modes and the text content element editability
            toggleDisplayModes();
            makeContentEditable(false, textContentElement);
          }
        } else {
          if (
            elType.classList.contains("edit-mode") &&
            !e.target.closest(`.main__${elementType}-container`) &&
            isTextContentClicked === false
          ) {
            //Toggle display modes and the text content element editability
            toggleDisplayModes();
            makeContentEditable(false, textContentElement);
          }
        }
      });

      //When the generated element from element type is clicked
      elType.addEventListener("click", (e) => {
        //If what is clicked is not the text content element
        //and the text content element is equal to the passed in
        //value of textContentEl
        if (
          e.target !== textContentElement &&
          isTextContentClicked === false &&
          textContentElement === textContentEl
        ) {
          toggleDisplayModes();
        }
        //If the text content element is clicked and the generated element from element type
        //is in display mode
        else if (
          e.target === textContentElement &&
          elType.classList.contains("display-mode")
        ) {
          toggleDisplayModes();
        }

        //If the generated element from element type is in edit mode
        if (elType.classList.contains("edit-mode")) {
          //Make the element's content editable
          makeContentEditable(true, textContentElement);
        } else {
          //Disable the element's content editability
          makeContentEditable(false, textContentElement);
        }
      });

      //If the element type is either 'step' or 'ingredient'
      if (elementArray !== undefined) {
        //When the remove button is clicked
        removeButtonEl.addEventListener("click", () => {
          //Remove the specified step or ingredient from their
          //respective arrays
          elArray.splice(index, 1);
          //Update the changes
          updateChanges(recipe);
          //Rerender the recipe's edit page
          renderEditItems(recipe);
        });
      }
    };

    clickEventListeners(textContentEl);

    //Add the click event listeners to the cooking time minutes
    //text content element
    if (textContentElTwo) {
      clickEventListeners(textContentElTwo);
    }

    //When the user clicks and drags the text content in the text content element
    //and releases the click outside the text content element
    window.addEventListener("mouseup", (e) => {
      //This prevents the toggling of edit mode on the parent of the text content element
      //when the click is released outside of the text content element
      if (isTextContentClicked === true) {
        //Revert back the isTextContentClicked boolean back to false after 100ms
        setTimeout(() => {
          isTextContentClicked = false;
        }, 100);
      }
    });

    const textContentKeyDownEvent = (textContentEl) => {
      const textContentElement = textContentEl;
      //When the enter key is pressed in the text content element
      textContentElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          //Change the parent element back to display mode
          toggleDisplayModes();
          //Disable the editability of the text content element
          makeContentEditable(false, textContentElement);
        }
      });
    };

    textContentKeyDownEvent(textContentEl);

    //Add the textContentKeyDownEvent event listeners to
    //the cooking time minutes text content element
    if (elementType === "cooking-time") {
      textContentKeyDownEvent(textContentElTwo);
    }

    //If the element type is either 'serving-size' or 'cooking-time'
    if (elementType === "serving-size" || elementType === "cooking-time") {
      //When the text content in the text content element (input) is changed
      textContentEl.addEventListener("input", (e) => {
        //If the element type is 'serving-size'
        if (elementType === "serving-size") {
          //If the input value is greater than 4 integers long
          if (e.target.value.length > 4) {
            //Set the maximum input value to 9999
            e.target.value = 9999;
          }

          //Update the serving size key value in the recipe object
          updateRecipe(recipeId, {
            servingSize: parseInt(e.target.value),
          });

          //Update and save changes
          updateChanges(recipe);
        }

        //If the element type is 'cooking-time'
        if (elementType === "cooking-time") {
          //If the input value is greater than 2 integers long
          if (e.target.value.length > 2) {
            //Set the maximum input value to 99
            e.target.value = 99;
          }
          //Update the cooking time hours key value in the recipe object
          updateRecipe(recipeId, {
            cookingTime: {
              hours: parseInt(e.target.value),
            },
          });

          //Update and save changes
          updateChanges(recipe);
        }
      });

      //If the element type is 'cooking-time'
      if (elementType === "cooking-time") {
        //When the text content in the cooking time minutes element (input) is changed
        textContentElTwo.addEventListener("input", (e) => {
          //If the input value is greater than 2 integers long
          if (e.target.value.length > 2) {
            //Set the maximum input value to 99
            e.target.value = 99;
          }

          //Update the cooking time minutes key value in the recipe object
          updateRecipe(recipeId, {
            cookingTime: {
              minutes: parseInt(e.target.value),
            },
          });
          //Update and save changes
          updateChanges(recipe);
        });
      }
    } //If the element type is either 'recipe-title', 'cuisine', 'step', or 'ingredient'
    else if (
      elementType === "recipe-title" ||
      elementType === "cuisine" ||
      elementArray !== undefined
    ) {
      //Create a new mutation observer
      const observer = new MutationObserver((mutations) => {
        //Loop through each mutation and update the key value of
        //the text content changes on each element type that has
        //been changed
        mutations.forEach((mutation) => {
          if (elementType === "recipe-title") {
            updateRecipe(recipeId, {
              title: mutation.target.textContent,
            });
          } else if (elementType === "cuisine") {
            updateRecipe(recipeId, {
              cuisineType: mutation.target.textContent,
            });
          } else if (elementArray !== undefined) {
            elArray.splice(index, 1, mutation.target.textContent);
          }
          //Update and save changes
          updateChanges(recipe);
        });
      });

      //Observe changes on the text content elements
      observer.observe(textContentEl, {
        characterData: true,
        childList: true,
        subtree: true,
      });

      //If the element type is either 'step' or 'ingredient'
      if (elementArray !== undefined) {
        //Append the generated element of the element type to it's respective
        //column container
        document
          .querySelector(`#main__${elementArray}-col`)
          .appendChild(elType);
      }
    }
  };
  //If the element type is either 'step' or 'ingredient'
  if (elementArray !== undefined) {
    //Clear the inner HTML of the instructions or ingredients column
    document.querySelector(`#main__${elementArray}-col`).innerHTML = "";

    //If the instructions element array
    if (elementArray === "instructions") {
      //Set the value of elArray to the instructions key value of the recipe object
      elArray = recipe.instructions;
    } else if (elementArray === "ingredients") {
      //Set the value of elArray to the ingredients key value of the recipe object
      elArray = recipe.ingredients;
    }

    //Loop through each item in the element array and attach
    //the render event listeners to each item
    elArray.forEach((item, index) => {
      renderEventListeners(index);
    });
  } else {
    renderEventListeners(index);
  }
};

export { renderGeneratedCards };
