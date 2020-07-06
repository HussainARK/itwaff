import React from "react";
import { Text, Link as FUILink } from "@fluentui/react";

const AboutPage = (props) => {
  const renderUsersCount = () => {
    if (props.usersCount === 1) return <>{props.usersCount} user</>;
    if (props.usersCount > 1) return <>{props.usersCount} users</>;
    if (props.usersCount === 0) return <>no users</>;
  };

  const renderPostsCount = () => {
    if (props.postsCount === 1) return <>{props.postsCount} post</>;
    if (props.postsCount > 1) return <>{props.postsCount} posts</>;
    if (props.postsCount === 0) return <>no posts</>;
  };

  return (
    <>
      <Text>
        <h1>About</h1>
      </Text>
      <Text>
        This is a Small Social media App Created by{" "}
        <FUILink href="https://github.com/HussainARK" target="_blank">
          HussainARK
        </FUILink>
        .
        <br />
        {props.postsCount !== 0 && props.usersCount !== 0 ? (
          <>
            This Project contains {renderUsersCount()} and {renderPostsCount()}.
          </>
        ) : (
          <>Loading...</>
        )}
      </Text>
    </>
  );
};

export default AboutPage;
