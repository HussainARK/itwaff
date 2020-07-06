import { envs } from "./utils";

export const getUsers = async () => {
  return await fetch(`${envs.apiUrl}/users`, {
    method: "GET",
    headers: { Authorization: envs.apiKey },
  });
};

export const getPosts = async () => {
  return await fetch(`${envs.apiUrl}/posts`, {
    method: "GET",
    headers: { Authorization: envs.apiKey },
  });
};

export const createUser = async (body) => {
  return await fetch(`${envs.apiUrl}/users`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: [
      ["Authorization", envs.apiKey],
      ["Content-Type", "application/json"],
    ],
  });
};

export const createPost = async (body) => {
  return await fetch(`${envs.apiUrl}/posts`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: [
      ["Authorization", envs.apiKey],
      ["Content-Type", "application/json"],
    ],
  });
};

export const deleteUser = async () => {
  return await fetch(`${envs.apiUrl}/users`, {
    method: "DELETE",
    headers: { Authorization: envs.apiKey },
  });
};

export const deletePost = async () => {
  return await fetch(`${envs.apiUrl}/posts`, {
    method: "DELETE",
    headers: { Authorization: envs.apiKey },
  });
};

export const login = async (userinfo) => {
  return await fetch(`${envs.apiUrl}/login`, {
    method: "POST",
    headers: [
      ["Authorization", envs.apiKey],
      ["Content-Type", "application/json"],
    ],
    body: JSON.stringify(userinfo),
  });
};
