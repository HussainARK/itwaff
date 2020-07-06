import React from "react";

import { Text, Link as FUILink } from "@fluentui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <Text>Twaff</Text>{" "}
      <Link to="/">
        <FUILink>Home</FUILink>
      </Link>{" "}
      <Link to="/new">
        <FUILink>New Post</FUILink>
      </Link>{" "}
      <Link to="/about">
        <FUILink>About</FUILink>
      </Link>
    </header>
  );
};

export default NavBar;
