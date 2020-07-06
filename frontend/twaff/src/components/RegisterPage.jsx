import React, { useState } from "react";
import { storage } from "../firebase/";
import { createUser } from "../api";

import {
  Text,
  TextField,
  PrimaryButton,
  Stack,
  Spinner,
} from "@fluentui/react";
import { Redirect } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const [image, setImage] = useState({});

  const justLoading = () => {
    if (loading) {
      return <Spinner label="Registering the Account..." />;
    }
  };

  const redirectNow = () => redirect && <Redirect to="/login" />;

  const minimumPasswordLength = 7;

  const stackTokens = {
    childrenGap: 20,
    maxWidth: 350,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const uploadTask = storage.ref(`users_images/${username}_image`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Snapshot
      },
      (err) => {
        // Error
      },
      () => {
        // Complete
        storage
          .ref("users_images")
          .child(`${username}_image_100x100`)
          .getDownloadURL()
          .then((url) => {
            createUser({
              name: username,
              email: email,
              password: password,
              user_image_url: url,
              description,
            });
            setTimeout(() => setRedirect(true), 3000);
            setLoading(false);
          });
      }
    );
  };

  return (
    <>
      <Stack tokens={stackTokens}>
        <form onSubmit={handleSubmit}>
          <Text>Register a Twaff Account</Text>
          <TextField
            label="Username"
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            onGetErrorMessage={(value) => {
              return value.length !== ""
                ? ""
                : `The Username field is Required`;
            }}
          />
          <TextField
            label="Email"
            type="email"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            onGetErrorMessage={(value) => {
              return value.length !== "" ? "" : `The Email field is Required`;
            }}
          />
          <TextField
            required
            minLength={`${minimumPasswordLength}`}
            type="password"
            label="Password"
            onGetErrorMessage={(value) => {
              return value.length > minimumPasswordLength
                ? ""
                : `Password length must be more than ${minimumPasswordLength}. Actual length is ${value.length}.`;
            }}
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            label="Description"
            required
            type="text"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            onGetErrorMessage={(value) => {
              return value.length !== ""
                ? ""
                : `The Description field is Required`;
            }}
          />
          <label htmlFor="user-image">
            <Text>User Image</Text>
          </label>
          <input
            type="file"
            required
            id="user-image"
            onChange={(event) => {
              const imageFile = event.target.files[0];
              if (imageFile) {
                setImage(imageFile);
              } else {
              }
            }}
          />
          <PrimaryButton text="Register" type="submit" />
        </form>
      </Stack>
      {justLoading()}
      {redirectNow()}
    </>
  );
};

export default RegisterPage;
