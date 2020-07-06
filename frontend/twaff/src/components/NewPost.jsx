import React, { useState } from "react";
import { envs, redirectIfNotLoggedIn } from "../utils";
import { Redirect } from "react-router-dom";
import { Text, TextField, PrimaryButton } from "@fluentui/react";
import cookie from "react-cookies";

const NewPost = (props) => {
  const [text, setText] = useState("");
  const [redirect, setRedirect] = useState(false);

  const redirectNow = () => redirect && <Redirect to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`${envs.apiUrl}/posts`, {
      method: "POST",
      headers: [
        ["Authorization", envs.apiKey],
        ["Content-Type", "application/json"],
      ],
      body: JSON.stringify({ userId: cookie.load("userid"), postText: text }),
    });

    props.getPosts();

    setRedirect(true);
  };

  return (
    <>
      {redirectIfNotLoggedIn()}
      <Text>New Post</Text>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="Post Text"
          required
          onChange={(event) => setText(event.target.value)}
        />
        <PrimaryButton type="submit" text="+ Post" />
      </form>
      {redirectNow()}
    </>
  );
};

export default NewPost;
