import Types from "../utils/types";

const initialState = {
  name: "",
  image: "",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjkwNTM2MTc4NzQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTWF0aW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoiMjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVlOGQ4NTI3NTgxYTBkMTFkNGFlNjUxZiIsImV4cCI6MTkwMjIxNzcyOSwiaXNzIjoiaHR0cDovL3NoZXBlbC5pciIsImF1ZCI6Imh0dHA6Ly9zaGVwZWwuaXIifQ.WWU94ECd2CkmamNivKu_AlwliYPCdlg03FIyXbXP9cI",
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
