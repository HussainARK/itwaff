import React from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router-dom";

const usedCookieNames = [
  "username",
  "email",
  "description",
  "user_image_url",
  "userid",
];

const redirectIfNotLoggedIn = () => {
  if (
    cookie.load("username") &&
    cookie.load("email") &&
    cookie.load("description") &&
    cookie.load("user_image_url") &&
    cookie.load("userid")
  ) {
    return;
  } else {
    return <Redirect to="login" />;
  }
};

const loggedIn = () => {
  if (
    cookie.load("username") &&
    cookie.load("email") &&
    cookie.load("description") &&
    cookie.load("user_image_url") &&
    cookie.load("userid")
  ) {
    return true;
  } else {
    return false;
  }
};

const { REACT_APP_API_URL: apiUrl, REACT_APP_API_KEY: apiKey } = process.env;
const envs = { apiUrl, apiKey };

export { envs, redirectIfNotLoggedIn, loggedIn, usedCookieNames };
