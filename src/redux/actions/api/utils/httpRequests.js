export const postRequest = (token) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Token: token,
    },
  };
};

export const getRequest = (token) => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  };
};

export const createRequestParams = (params = {}) => {
  let res = "?";
  const paramsKeys = Object.keys(params);
  paramsKeys.forEach((paramKey) => {
    res += paramKey + "=" + params[paramKey] + "&";
  });
  return res;
};
