import Cookies from 'js-cookie';

// Function to set a JSON object as a cookie
export const setJsonCookie = (name, jsonValue, options = {}) => {
  Cookies.set(name, JSON.stringify(jsonValue), options);
};

// Function to get a JSON object from a cookie by name
export const getJsonCookie = (name) => {
  const cookieValue = Cookies.get(name);
  return cookieValue ? JSON.parse(cookieValue) : null;
};

// Function to remove a cookie by name
export const removeCookie = (name) => {
  Cookies.remove(name);
};
