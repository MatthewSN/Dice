import Types from "../utils/types";
import GamePlayingStates from "../../utils/gamePlayingStates";

export const setPointsInfo = (pointsInof = {}) => ({
  type: Types.SET_POINTS_INFO,
  payload: pointsInof,
});

export const setUserInfo = (user = {}) => ({
  type: Types.SET_USER,
  payload: user,
});

export const setAppStatus = (status = {}) => ({
  type: Types.SET_APP_STATUS,
  payload: status,
});

export const setIsFetching = (isFetching) => ({
  type: Types.SET_IS_FETCHING,
  payload: isFetching,
});

export const setIsAdAvailable = (isAvailable) => ({
  type: Types.SET_IS_AD_AVAILABLE,
  payload: isAvailable,
});

export const setCodeSent = (codeSent = false) => ({
  type: Types.SET_CODE_SENT,
  payload: codeSent,
});

export const setShouldGetScoreInfo = (shouldFetch = false) => ({
  type: Types.SET_SHOULD_GET_SCORE_INFO,
  payload: shouldFetch,
});

export const setIsAuth = (isAuth) => ({
  type: Types.SET_IS_AUTH,
  payload: isAuth,
});

export const setToken = (token = "") => ({
  type: Types.SET_TOKEN,
  payload: token,
});

export const setName = (name = "") => ({
  type: Types.SET_NAME,
  payload: name,
});

//Action for changing the game state
export const setGamePlayingState = (
  gamePlayingState = GamePlayingStates.NOT_PLAYING
) => ({
  type: Types.SET_GAME_PLAYING_STATE,
  payload: gamePlayingState,
});
