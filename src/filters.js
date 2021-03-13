// Declare the filters object
const filters = {
  searchText: "",
  sortedBy: "lastCreated",
};

// Expose filters object outside of module
const getFilters = () => filters;

// Set filters by updates in the filters object key values
const setFilters = (updates) => {
  // If the value that is updated in the search text filter object key is a string
  if (typeof updates.searchText === "string") {
    // Replace the value of searchText with the updated value
    filters.searchText = updates.searchText;
  }

  // If the value that is updated in the sortedBy filter object key is a string
  if (typeof updates.sortedBy === "string") {
    // Replace the value of sortedBy with the updated value
    filters.sortedBy = updates.sortedBy;
  }

  //If the value that is updated in the sortedBy filter object key is an array
  if (Array.isArray(updates.sortedBy)) {
    /// Replace the value of sortedBy with the updated value
    filters.sortedBy = updates.sortedBy;
  }
};

//Export functions
export { getFilters, setFilters };
