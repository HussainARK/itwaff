import React from "react";

import { Text } from "@fluentui/react";
import cookie from "react-cookies";
import { Redirect } from "react-router-dom";
import { usedCookieNames, loggedIn } from "../utils";

const Logout = () => {
  const logoutPlease = () => {
    if (loggedIn()) {
      usedCookieNames.forEach((cookieName) => cookie.remove(cookieName));
    }

    return <Redirect to="/" />;
  };

  return (
    <>
      <Text>Logging you out...</Text>
      {logoutPlease()}
    </>
  );
};

export default Logout;
