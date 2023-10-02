import { combineReducers } from "redux";
import auth from "./auth";
import products from "./product";
import singleProduct from "./singleProduct";

export default combineReducers({ auth, products, singleProduct });
