export const postRequest = (token) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  res = res.substring(0, res.length - 1);
  return res;
};
