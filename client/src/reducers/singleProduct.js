// src/reducers/productReducer.js

// Initial state for a single product
const initialState = {
  id: "",
  description: "",
  category: "",
  gender: "",
  price: 0,
  supplier: "",
  likes: 0,
  color: "",
};

// Reducer function for the single product state
const singleProduct = (state = initialState, action) => {
  switch (action.type) {
    // Define cases for handling actions related to the product
    case "FETCH_PRODUCTS_BY_ID":
      return action.payload; // Set the product state to the fetched data
    // case "CLEAR_PRODUCT":
    //   return initialState; // Clear the product state
    default:
      return state;
  }
};

export default singleProduct;
