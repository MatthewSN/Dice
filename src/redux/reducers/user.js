import Types from "../utils/types";

const initialState = {
  name: "",
  image: "",
  token: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case Types.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
