import Types from "../utils/types";
import GamePlayingStates from "../../utils/gamePlayingStates";

const initialState = {
  codeSent: false,
  gameFinished: false,
  points: 0,
  isFetching: false,
  isAdAvailable: false,
  shouldGetScoreInfo: true,
  isAuth: false,
  gamePlayingState: GamePlayingStates.NOT_PLAYING,
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
    case Types.SET_GAME_PLAYING_STATE:
      return {
        ...state,
        gamePlayingState: action.payload,
      };
    default:
      return state;
  }
};
