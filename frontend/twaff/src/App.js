import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch,  } from "react-router-dom";

import NavBar from "./components/NavBar";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import Error404 from "./components/Error404";
import RegisterPage from "./components/RegisterPage";
import Logout from "./components/Logout";
import DeleteAccount from "./components/DeleteAccount";
import NewPost from "./components/NewPost";
import ProfilePage from "./components/ProfilePage";
import AboutPage from "./components/AboutPage";
import { envs } from "./utils";

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const getPosts = async () => {
    const response = await fetch(`${envs.apiUrl}/posts`, {
      method: "GET",
      headers: { Authorization: envs.apiKey },
    });

    setPosts(await response.json());
  };

  const getUsers = async () => {
    const response = await fetch(`${envs.apiUrl}/users`, {
      method: "GET",
      headers: { Authorization: envs.apiKey },
    });

    setUsers(await response.json());
  };

  useEffect(() => {
    getPosts();
    getUsers();
  });

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            return (
              <HomePage
                {...props}
                posts={posts}
                users={users}
                setPosts={setPosts}
                getUsers={getUsers}
                getPosts={getPosts}
              />
            );
          }}
        />
        <Route
          path="/about"
          exact
          render={(props) => {
            return (
              <AboutPage
                {...props}
                postsCount={posts.length}
                usersCount={users.length}
              />
            );
          }}
        />
        <Route
          path="/login"
          exact
          render={(props) => {
            return <LoginPage {...props} />;
          }}
        />
        <Route
          path="/register"
          exact
          render={(props) => {
            return <RegisterPage {...props} />;
          }}
        />
        <Route
          path="/logout"
          exact
          render={(props) => {
            return <Logout {...props} />;
          }}
        />
        <Route
          path="/delete-account"
          exact
          render={(props) => {
            return <DeleteAccount {...props} />;
          }}
        />
        <Route
          path="/new"
          exact
          render={(props) => {
            return <NewPost {...props} getPosts={getPosts} />;
          }}
        />
        <Route
          path="/profile"
          exact
          render={(props) => {
            return (
              <ProfilePage
                {...props}
                posts={posts}
                users={users}
                getUsers={getUsers}
                getPosts={getPosts}
              />
            );
          }}
        />
        <Route
          path="*"
          render={(props) => {
            return <Error404 {...props} />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
