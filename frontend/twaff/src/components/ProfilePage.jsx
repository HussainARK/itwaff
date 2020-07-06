import React from "react";

import { Text } from "@fluentui/react";
import { redirectIfNotLoggedIn } from "../utils";

const ProfilePage = () => {
  return (
    <>
      <Text>Profile Page</Text>
      {redirectIfNotLoggedIn()}
    </>
  );
};

export default ProfilePage;
