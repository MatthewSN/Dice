import Types from "../utils/types";

export const setPointsInfo = (pointsInof = {}) => ({
  type: Types.SET_POINTS_INFO,
  payload: pointsInof
});

export const setUser = (user = {}) => ({
  type: Types.SET_USER,
  payload: user
});

export const setAppStatus = (status = {}) => ({
  type: Types.SET_APP_STATUS,
  payload: status
});

export const setIsFetching = isFetching => ({
  type: Types.SET_IS_FETCHING,
  payload: isFetching
});
