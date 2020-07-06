import React from "react";

import { Text, Link as FUILink } from "@fluentui/react";

const Error404 = (props) => {
  return (
    <>
      <Text><h1>404</h1></Text>
      <FUILink onClick={props.history.goBack}>Redirect to the last Page &laquo;</FUILink>
    </>
  );
};

export default Error404;
