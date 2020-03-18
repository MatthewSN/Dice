export const postRequest = (url, objParams = {}) => {
  const formData = new FormData();
  for (var k in objParams) {
    formData.append(k, objParams[k]);
  }
  const request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: formData
  });
  return fetch(request);
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
