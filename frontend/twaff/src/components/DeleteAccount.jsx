import React, { useState } from "react";
import { envs, usedCookieNames, redirectIfNotLoggedIn } from "../utils";
import cookie from "react-cookies";
import { storage } from "../firebase/index";
import {
  DefaultButton,
  Text,
  Spinner,
} from "@fluentui/react";
import { Redirect } from "react-router-dom";

const DeleteAccount = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirectNow = () => redirect && <Redirect to="/" />;

  const deleteTheAccount = async () => {
    setLoading(true);

    await fetch(`${envs.apiUrl}/users/${cookie.load("userid")}`, {
      method: "DELETE",
      headers: { Authorization: envs.apiKey },
    });

    storage
      .ref("users_images")
      .child(`${cookie.load("username")}_image_100x100`)
      .delete();

    usedCookieNames.forEach((cookieName) => cookie.remove(cookieName));

    for (let post in props.posts) {
      if (post.userid === cookie.load("userid")) {
        await fetch(`${envs.apiUrl}/posts/${post.postid}`, {
          method: "DELETE",
          headers: { Authorization: envs.apiKey },
        });
      }
    }

    setTimeout(() => setRedirect(true), 3000);
  };

  return (
    <>
      <Text>
        <b>
          This Operation cannot be undone, and All your Posts will be deleted
        </b>
      </Text>
      <DefaultButton text="Sure?" onClick={deleteTheAccount} />
      {(() => loading && <Spinner label="Deleteing..." />)()}
      {redirectNow()}
      {redirectIfNotLoggedIn()}
    </>
  );
};

export default DeleteAccount;
