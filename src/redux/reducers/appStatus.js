import Types from "../utils/types";

const initialState = {
  codeSent: false,
  gameFinished: false,
  points: 0,
  isFetching: false,
  isAdAvailable: false,
  shouldGetScoreInfo: true,
  isAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case Types.SET_IS_AD_AVAILABLE:
      return {
        ...state,
        isAdAvailable: action.payload,
      };
    case Types.SET_CODE_SENT:
      return {
        ...state,
        codeSent: action.payload,
      };
    case Types.SET_SHOULD_GET_SCORE_INFO:
      return {
        ...state,
        shouldGetScoreInfo: action.payload,
      };
    case Types.SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      return state;
  }
};
