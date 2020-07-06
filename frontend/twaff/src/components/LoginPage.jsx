import React, { useState } from "react";

import {
  Text,
  TextField,
  PrimaryButton,
  Stack,
  Spinner,
} from "@fluentui/react";
import cookie from "react-cookies";
import { Redirect } from "react-router-dom";
import { loggedIn } from "../utils";
import { login } from "../api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const redirectNow = () => redirect && <Redirect to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const response = login({ email: email, password: password });

    if (response.status === 400) {
      setLoading(false);
      alert("There are no User");
    } else {
      const responseBody = (await response).json();
      setLoading(false);
      cookie.save("userid", responseBody.id);
      cookie.save("username", responseBody.name);
      cookie.save("email", responseBody.email);
      cookie.save("description", responseBody.description);
      cookie.save("user_image_url", responseBody.user_image_url);
      setRedirect(true);
    }
  };

  const checkLoggedIn = () => {
    if (loggedIn()) return <Redirect to="/" />;
  };

  const justLoading = () => {
    if (loading) {
      return <Spinner label="Logging you In..." />;
    }
  };

  const minimumPasswordLength = 7;

  const stackTokens = {
    childrenGap: 20,
    maxWidth: 350,
  };

  return (
    <>
      {checkLoggedIn()}
      <Stack tokens={stackTokens}>
        <Text>Login</Text>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            required
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            onGetErrorMessage={(value) => {
              return value.length !== "" ? "" : `The Email field is Required`;
            }}
          />
          <TextField
            required
            type="password"
            label="Password"
            onGetErrorMessage={(value) => {
              return value.length > minimumPasswordLength
                ? ""
                : `Password length must be more than ${minimumPasswordLength}. Actual length is ${value.length}.`;
            }}
            onChange={(event) => setPassword(event.target.value)}
          />
          <PrimaryButton text="Login" type="submit" />
        </form>
      </Stack>
      {justLoading()}
      {redirectNow()}
    </>
  );
};

export default LoginPage;
