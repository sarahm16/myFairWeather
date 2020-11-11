import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import searchReducer from './searchReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  results: searchReducer
});