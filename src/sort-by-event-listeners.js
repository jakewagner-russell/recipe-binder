import { renderFilterMenu, renderRecipes } from "./views";
import { setFilters } from "./filters";

//Add event listeners to the sort by filter options
const sortByEventListeners = (filterType, array) => {
  const filterOptionsColEl = document.querySelector(
    ".sidebar-filter-menu__filter-options-col"
  );
  const filterTypeEl = document.querySelector(
    `#sidebar-filter-menu__filter-type-${filterType}`
  );
  const isClicked = document.getElementsByClassName("clicked");

  //Set a minimum height for the filter options column
  const setMinHeight = () => {
    if (filterType === "cuisine") {
      filterOptionsColEl.style.minHeight = "10rem";
    } else if (filterType === "ingredient") {
      filterOptionsColEl.style.minHeight = "15rem";
    } else {
      filterOptionsColEl.style.removeProperty("min-height");
    }
  };

  //When a filter type element is clicked
  filterTypeEl.addEventListener("click", () => {
    //If a filter type element has 'clicked' class styling
    if (isClicked.length > 0) {
      Array.from(isClicked).forEach((item) => {
        //Remove all 'clicked' class styling from any element that has it
        item.classList.remove("clicked");
      });
    }

    //Add the 'clicked' class to the filter type element
    filterTypeEl.classList.add("clicked");

    //If the filter type is 'cuisine', 'cooking-time', or ingredient
    if (filterType !== "recently-added" && filterType !== "last-updated") {
      //Clear the inner HTML of the filter options column
      filterOptionsColEl.innerHTML = "";

      //Set a minimum height for the filter options column
      setMinHeight();

      //Make the filter options column visible
      filterOptionsColEl.style.opacity = "1";

      //If there is an array argument
      if (array) {
        //Render all filter options
        renderFilterMenu(array);
      }
    } else {
      //Hide the filter options column
      filterOptionsColEl.style.opacity = "0";
    }

    const checkBox = document.querySelectorAll(
      ".sidebar-filter-menu__filter-options-checkbox"
    );

    //Initialize the checkedFilterOptionsArray with an empty array
    let checkedFilterOptionsArray = [];

    //Loop through all checkboxes on each filter options
    Array.from(checkBox).forEach((item) => {
      //When the checkbox is checked
      item.addEventListener("change", (e) => {
        //Get the label text content from the checkbox's corresponding label
        const labelText = (element) => {
          const el = element;
          return element.parentElement.nextSibling.textContent;
        };

        //Get the index of the label text content from the checkbox's corresponding label
        //in checkedFilterOptionsArray
        const checkBoxLabelTextIndex = checkedFilterOptionsArray.indexOf(
          labelText(item)
        );

        //If the filter type is 'cuisine' or 'cooking-time'
        if (filterType === "cuisine" || filterType === "cooking-time") {
          const checkedElementArray = Array.from(
            document.querySelectorAll("input:checked")
          );

          //Loop through all checked elements
          checkedElementArray.forEach((checkedEl) => {
            //Remove checks from any existing checked elements
            if (checkedEl !== item) {
              checkedEl.checked = false;
              checkedFilterOptionsArray.splice(checkBoxLabelTextIndex, 1);
            }
          });
        }
        //If a checkbox is checked, add it's corresponding label text content to checkedFiltersOptionsArray
        //Otherwise, remove it from checkedFiltersOptionsArray
        if (item.checked) {
          checkedFilterOptionsArray.push(labelText(item));
        } else {
          checkedFilterOptionsArray.splice(checkBoxLabelTextIndex, 1);
        }

        //If there are any items in checkedFilterOptionsArray, set the updated setFilters key value of sortedBy to those items
        //Otherwise, set the setFilters key value of sortedBy to lastCreated
        if (checkedFilterOptionsArray.length > 0) {
          setFilters({
            sortedBy: checkedFilterOptionsArray,
          });
        } else if (checkedFilterOptionsArray.length === 0) {
          setFilters({
            sortedBy: "lastCreated",
          });
        }

        //Render recipe cards
        renderRecipes();
      });
    });

    //If the filter type is 'recently-added'
    if (filterType === "recently-added") {
      //Set the setFilters key value of sortedBy to lastCreated
      setFilters({
        sortedBy: "lastCreated",
      });

      //Render recipe cards
      renderRecipes();
    }

    //If the filter type is 'last-updated'
    if (filterType === "last-updated") {
      //Set the setFilters key value of sortedBy to lastUpdated
      setFilters({
        sortedBy: "lastUpdated",
      });
      //Render recipe
      renderRecipes();
    }
  });
};

export { sortByEventListeners };
