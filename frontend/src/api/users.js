import { axi } from "./useAxios";

export const registerRequest = async (username, email, password) => {
  const response = await axi.post("/register/", {
    username,
    email,
    password,
  });
  return response;
};

export const loginRequest = async (username, password) => {
  const response = await axi.post("/login/", {
    username,
    password,
  });
  return response;
};
