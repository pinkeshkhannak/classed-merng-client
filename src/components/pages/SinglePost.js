import React, { useContext, useRef, useState } from "react";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  Form,
  Card,
  Icon,
  Grid,
  Image,
  Label,
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../LikeButton";
import DeleteButton from "../DeleteButton";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const SinglePost = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const commentInputRef = useRef(null);
  const postId = params.postId;
  const { user } = useContext(AuthContext);
  console.log(postId);
  const [comment, setComment] = useState("");
  const { error, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  if (error) console.log("error", error);
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      console.log("hey");
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });
  function deletePostCallback() {
    console.log("history");
    navigate("/");
  }
  let postMarkup;
  if (!data) {
    postMarkup = <p> Loading a post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      likes,
      comments,
      likeCount,
      commentCount,
    } = data.getPost;
    console.log("body111", id, commentCount);
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button labelPosition="right">
                  <Button
                    as="div"
                    color="blue"
                    basic
                    style={{
                      width: "10px",
                      paddingLeft: "15px",
                      paddingRight: "30px",
                    }}
                  >
                    <Icon name="comments" />
                  </Button>
                  <Label
                    basic
                    color="blue"
                    pointing="left"
                    style={{
                      height: "36px",
                    }}
                  >
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <>
                <Card fluid>
                  <Card.Content>
                    <p> Post a comment</p>
                    <Form>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          placeholder="Comment.."
                          name="comment"
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          ref={commentInputRef}
                        />
                        <button
                          type="submit"
                          className="ui button teal"
                          disabled={comment.trim() === ""}
                          onClick={() => submitComment()}
                        >
                          submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              </>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
                <Card.Content float="right">
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        username
        createdAt
        username
      }
      commentCount
    }
  }
`;
export default SinglePost;
