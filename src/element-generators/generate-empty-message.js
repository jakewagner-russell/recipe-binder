import {
  RecipeDOMElement,
  constructElementsFromArray,
} from "./recipe-dom-element";

//Generate a message for the end user in case no recipes exist
//or if the filter/sorted parameters do not return a match

const generateEmptyMessage = (isInitial) => {
  //Define and construct the illustration element
  const msgContainerIllustrationElObj = new RecipeDOMElement(
    "msgContainerIllustrationEl",
    "img",
    undefined,
    "main__message-container-illustration",
    undefined,
    [
      ["src", "img/undraw_cooking_lyxy.svg"],
      ["alt", "Illustration of person sitting on a chef's hat"],
    ]
  );

  msgContainerIllustrationElObj.constructElement();

  //Define the title element of the message container
  const msgContainerTitleElObj = new RecipeDOMElement(
    "msgContainerTitleEl",
    "h1",
    undefined,
    "main__message-container-text-content-title"
  );

  //Define the subtitle element of the message container
  const msgContainerSubtitleElObj = new RecipeDOMElement(
    "msgContainerSubtitleEl",
    "h4",
    undefined,
    "main__message-container-text-content-subtitle"
  );

  //If the application is opened initially or no recipes exist
  if (isInitial === true) {
    //Set text content of message container title and subtitle
    msgContainerTitleElObj.textContent = "This looks a little empty.";
    msgContainerSubtitleElObj.textContent =
      "Create a new recipe with the button above!";
  }
  //If the filter input or the sorted by parameters do not produce a match
  else {
    //Set text content of message container title and subtitle
    msgContainerTitleElObj.textContent = "Sorry!";
    msgContainerSubtitleElObj.textContent =
      "No recipes found. Try something different.";
  }

  //Declare the text content element array and construct title and subtitle elements of the message container
  const msgContainerTextContentElementArray = new Array(
    msgContainerTitleElObj,
    msgContainerSubtitleElObj
  );

  constructElementsFromArray(msgContainerTextContentElementArray);

  //Declare and construct the text content element of the message container
  const msgContainerTextContentElObj = new RecipeDOMElement(
    "msgContainerTextContentEl",
    "div",
    undefined,
    "main__message-container-text-content",
    undefined,
    undefined,
    [msgContainerTitleEl, msgContainerSubtitleEl]
  );

  msgContainerTextContentElObj.constructElement();

  //Declare and construct the message container element
  const msgContainerElObj = new RecipeDOMElement(
    "msgContainerEl",
    "div",
    undefined,
    "main__message-container",
    undefined,
    undefined,
    [msgContainerIllustrationEl, msgContainerTextContentEl]
  );

  msgContainerElObj.constructElement();

  return msgContainerEl;
};

export { generateEmptyMessage };
