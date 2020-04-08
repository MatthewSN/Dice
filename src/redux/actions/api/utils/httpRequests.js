export const postRequest = token => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Token: token
    }
  };
};

export const getRequest = (url, token) => {
  const request = new Request(url, {
    method: "GET",
    headers: {
      Token: token
    },
    body: formData
  });
  return fetch(request);
};

export const createRequestParams = (params = {}) => {
  let res = "?";
  const paramsKeys = Object.keys(params);
  paramsKeys.forEach(paramKey => {
    res += paramKey + "=" + params[paramKey];
  });
  return res;
};
