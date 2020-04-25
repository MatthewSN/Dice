import Types from "../utils/types";

const initialState = {
  name: "Matin",
  avatarBase64: "",
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
    case Types.SET_AVATAR_BASE64:
      return {
        ...state,
        avatarBase64: action.payload,
      };
    default:
      return state;
  }
};
