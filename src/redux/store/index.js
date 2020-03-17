import { createStore, combineReducers } from "redux";
import pointInfoReducer from "../reducers/pointsInfo";
import userReducer from "../reducers/user";

const store = createStore(
  combineReducers({
    pointInfo: pointInfoReducer,
    user: userReducer
  })
);

export default store;
