import { createStore, combineReducers, applyMiddleware } from "redux";
import pointInfoReducer from "../reducers/pointsInfo";
import userReducer from "../reducers/user";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers(
    {
      pointInfo: pointInfoReducer,
      user: userReducer
    },
    applyMiddleware(thunk)
  )
);

export default store;
