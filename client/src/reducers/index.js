import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import searchReducer from './searchReducer';
//import favoritesReducer from './favoritesReducer';
import pageReducer from './pageReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  search: searchReducer,
  page: pageReducer
  //favorites: favoritesReducer
});