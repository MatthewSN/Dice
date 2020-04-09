import Types from "../utils/types";

const initialState = {
  name: "",
  point: 0,
  rank: 0,
  record: 0,
  poinInRecord: 0,
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
    default:
      return state;
  }
};
