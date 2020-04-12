import Types from "../utils/types";

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
