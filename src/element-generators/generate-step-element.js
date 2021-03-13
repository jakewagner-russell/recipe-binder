import {
  RecipeDOMElement,
  constructElementsFromArray,
} from "./recipe-dom-element";

//Generate the title for the step element
const generateStepTitle = (index) => {
  //Start index at one for step title number
  index += 1;

  //Define and construct the number element for the step title
  const stepTitleNumberElObj = new RecipeDOMElement(
    "stepTitleNumberEl",
    "span",
    index,
    "main__step-title-number"
  );

  stepTitleNumberElObj.constructElement();

  //Define the title element for the step title
  const stepTitleElObj = new RecipeDOMElement(
    "stepTitleEl",
    "h3",
    undefined,
    "main__step-title",
    "Step",
    undefined,
    stepTitleNumberEl
  );

  //Define the edit icon element for the step title
  const stepTitleEditIconElObj = new RecipeDOMElement(
    "stepTitleEditIconEl",
    "i",
    undefined,
    ["fas", "fa-edit", "main__step-edit-icon"]
  );

  //Declare the array for and construct the child elements for the step title container
  const stepTitleContainerElementsArray = new Array(
    stepTitleElObj,
    stepTitleEditIconElObj
  );

  constructElementsFromArray(stepTitleContainerElementsArray);

  //Define and construct the container element for the step title
  const stepTitleContainerElObj = new RecipeDOMElement(
    "stepTitleContainerEl",
    "div",
    undefined,
    "main__step-title-container",
    undefined,
    undefined,
    [stepTitleEl, stepTitleEditIconEl]
  );

  stepTitleContainerElObj.constructElement();

  return stepTitleContainerEl;
};

//Generate the remove button for the step element
const generateStepRemoveButton = () => {
  //Define and construct the minus icon element for the step remove button
  const removeButtonMinusIconElObj = new RecipeDOMElement(
    "removeButtonMinusIconEl",
    "i",
    undefined,
    ["fas", "fa-minus-circle", "main__minus-icon"]
  );

  removeButtonMinusIconElObj.constructElement();

  //Define and construct the button element for the step remove button
  const stepRemoveButtonElObj = new RecipeDOMElement(
    "stepRemoveButtonEl",
    "button",
    undefined,
    "main__step-remove-button",
    "Remove",
    undefined,
    removeButtonMinusIconEl
  );

  stepRemoveButtonElObj.constructElement();

  return stepRemoveButtonEl;
};

//Generate the step element
const generateStepElement = (recipe, index) => {
  //Define and construct the text content element for the step element
  const stepTextContentElObj = new RecipeDOMElement(
    "stepTextContentEl",
    "span",
    recipe.instructions[index],
    "main__step-text-content",
    undefined,
    ["contenteditable", "false"]
  );

  stepTextContentElObj.constructElement();

  //Define and construct the wrapper element for the step element
  const stepWrapperElObj = new RecipeDOMElement(
    "stepWrapperEl",
    "div",
    undefined,
    ["main__step-wrapper", "wrapper"],
    undefined,
    undefined,
    [generateStepTitle(index), stepTextContentEl, generateStepRemoveButton()]
  );

  stepWrapperElObj.constructElement();

  //Define and construct the text content element for the step element
  const stepContainerElObj = new RecipeDOMElement(
    "stepContainerEl",
    "div",
    undefined,
    ["main__step-container", "display-mode"],
    undefined,
    undefined,
    stepWrapperEl
  );

  stepContainerElObj.constructElement();

  return stepContainerEl;
};

export { generateStepTitle, generateStepRemoveButton, generateStepElement };
