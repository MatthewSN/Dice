import Types from "../utils/types";

const initialState = {
  codeSent: false,
  gameFinished: false,
  points: 0,
  isFetching: false,
  isAdAvailable: false,
  shouldReloadHomeScene: true,
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
    case Types.SET_SHOULD_RELOAD_HOME_SCENE:
      return {
        ...state,
        shouldReloadHomeScene: action.payload,
      };
    default:
      return state;
  }
};
