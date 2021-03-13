//DOM element constructor class
class RecipeDOMElement {
  //Initialize RecipeDOMElement object
  constructor(
    varName,
    elementType,
    textContent,
    classNames,
    textNode,
    attributes,
    appendedChild
  ) {
    this.varName = varName;
    this.elementType = elementType;
    this.textContent = textContent;
    this.classNames = classNames;
    this.textNode = textNode;
    this.attributes = attributes;
    this.appendedChild = appendedChild;
  }

  //Construct the DOM element from the values passed in
  constructElement() {
    const createEl = document.createElement(`${this.elementType}`);

    //Set initial element value to the passed-in variable
    window[`${this.varName}`] = createEl;

    //If there is multiple class names
    if (Array.isArray(this.classNames)) {
      //Loop through each one and add each class name to the element
      this.classNames.forEach((className) => {
        window[`${this.varName}`].classList.add(`${className}`);
      });
    } else {
      //Add the class name to the element
      window[`${this.varName}`].classList.add(`${this.classNames}`);
    }

    //If there is text content
    if (this.textContent !== undefined) {
      //Set the key value of this.textContent to the text content value of the element
      window[`${this.varName}`].textContent = this.textContent;
    }

    //If there is a child element
    if (this.appendedChild !== undefined) {
      //If there are multiple child elements
      if (Array.isArray(this.appendedChild)) {
        const appendChildArray = this.appendedChild;

        //Loop through each one and append each child element to the element
        appendChildArray.forEach((item) => {
          window[`${this.varName}`].appendChild(item);
        });
      } else {
        //Append child element to the element
        window[`${this.varName}`].appendChild(this.appendedChild);
      }
    }

    //If there is a text node
    if (this.textNode !== undefined) {
      //Create a text node with the key value of this.textNode
      const createNode = document.createTextNode(this.textNode);

      //If the text node value is either 'Step' or 'Remove'
      if (this.textNode === "Step" || this.textNode === "Remove") {
        //Append the text node before any other text nodes in the element
        window[`${this.varName}`].insertBefore(
          createNode,
          window[`${this.varName}`].childNodes[0]
        );
      } else {
        //Append the text node to the element
        window[`${this.varName}`].appendChild(createNode);
      }
    }

    //If there is any element attributes
    if (this.attributes !== undefined) {
      const attributesArray = this.attributes;

      //If there are multiple element attributes
      if (Array.isArray(attributesArray[0])) {
        //Loop through each attribute and set the attribute to the element
        attributesArray.forEach((attribute) => {
          window[`${this.varName}`].setAttribute(attribute[0], attribute[1]);
        });
      } else {
        //Set the attribute to the element
        window[`${this.varName}`].setAttribute(
          attributesArray[0],
          attributesArray[1]
        );
      }
    }

    return window[`${this.varName}`];
  }
}

//For multiple RecipeDOMElement elements that do not depend on one other to be constructed
const constructElementsFromArray = (array) => {
  const theArray = array;
  //Loop through each element and construct each element
  theArray.forEach((item) => {
    item.constructElement();
  });
};

export { RecipeDOMElement, constructElementsFromArray };
