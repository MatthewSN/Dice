import Types from "../utils/types";

const initialState = {
  codeSent: false,
  gameFinished: false,
  points: 0,
  isFetching: false,
  isAdAvailable: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      };
    case Types.SET_IS_AD_AVAILABLE:
      return {
        ...state,
        isAdAvailable: action.payload
      };
    default:
      return state;
  }
};
