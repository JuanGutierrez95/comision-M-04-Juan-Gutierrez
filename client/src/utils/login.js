export const saveData = async (data) => {
  const textValue = JSON.stringify(data);

  localStorage.setItem("username", textValue);
};

export const saveToken = () => {
  localStorage.setItem("token", token);
};

export const getData = () => {
  const data = localStorage.getItem("username");
  return JSON.parse(data);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const cleanLocalStorage = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
};
