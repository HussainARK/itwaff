import React, { useState } from "react";

import {
  Text,
  DefaultButton,
  PrimaryButton,
  Image,
  Link as FUILink,
  Spinner,
} from "@fluentui/react";
import cookie from "react-cookies";
import { loggedIn, envs, redirectIfNotLoggedIn } from "../utils";
import { Redirect } from "react-router-dom";

const HomePage = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [pathname, setPathname] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const showLoading = (text) => {
    setLoadingText(text);
    setLoading(true);
  };

  const deletePost = async (id) => {
    showLoading("Deleteing...");
    await fetch(`${envs.apiUrl}/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: envs.apiKey },
    });

    props.setPosts(props.posts.filter((post) => post.postid !== id));

    setLoading(false);
  };

  const renderPosts = () => {
    if (props.posts.length !== 0) {
      // try {
      return (
        <ul>
          {props.posts.map((post) => (
            <li key={post.postid}>
              <Text>
                {post.post_text}{" "}
                <Text style={{ color: "green" }}>
                  {props.users.find((user) => user.id === post.userid).name}
                </Text>
              </Text>
              {post.userid === cookie.load("userid") && (
                <>
                  {" "}
                  <FUILink onClick={() => deletePost(post.postid)}>
                    Delete
                  </FUILink>
                </>
              )}
            </li>
          ))}
        </ul>
      );
      // } catch {
      //   return <Text>Error, Try to refresh the page</Text>;
      // }
    } else {
      return <Text>Loading...</Text>;
    }
  };

  const redirectNow = () => redirect && <Redirect to={pathname} />;

  const goto = (path) => {
    return () => {
      setPathname(path);
      setRedirect(true);
    };
  };

  return (
    <>
      <Text>Home Page</Text>
      <br />
      {loggedIn() && (
        <>
          <Text style={{ color: "blue" }}>{cookie.load("username")}</Text>
          <br />
          <Image style={{ width: 100 }} src={cookie.load("user_image_url")} />
          <br />
          <DefaultButton text="Logout" onClick={goto("/logout")} />
          <br />
          {renderPosts()}
          <br />
          <DefaultButton
            text="Delete Account"
            onClick={goto("/delete-account")}
          />
          <br />
          <br />
          <PrimaryButton text="Register" onClick={goto("/register")} />
        </>
      )}
      {(() => loading && <Spinner label={loadingText} />)()}
      {redirectIfNotLoggedIn()}
      {redirectNow()}
    </>
  );
};

export default HomePage;
