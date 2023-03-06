import axios from "axios";

export const baseURL = "https://fastdev.connectcar.cl";

export const instance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Origin: "https://connect-car.leniolabs.com",
  },
});

export default {
  get: (url, params = {}) => {
    return instance({
      method: "GET",
      url: url,
      params,
    });
  },
};
