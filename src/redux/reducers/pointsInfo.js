import Types from "../utils/types";

const initialState = {
  currentPoint: 0,
  totalPoints: 0,
  rank: 0,
  record: 0,
  pointInRecord: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_POINTS_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
