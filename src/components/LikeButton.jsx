import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Button, Icon, Label } from "semantic-ui-react";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLinked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLinked(true);
    } else {
      setLinked(false);
    }
  }, [user, likes]);
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button
        color="red"
        style={{ width: "10px", paddingLeft: "15px", paddingRight: "30px" }}
      >
        <Icon name="heart" />
      </Button>
    ) : (
      <Button
        color="teal"
        basic
        style={{ width: "10px", paddingLeft: "15px", paddingRight: "30px" }}
      >
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button
      as={Link}
      to="/login"
      color="teal"
      style={{ width: "10px", paddingLeft: "15px", paddingRight: "30px" }}
    >
      <Icon name="heart" />
    </Button>
  );
  return (
    <>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
