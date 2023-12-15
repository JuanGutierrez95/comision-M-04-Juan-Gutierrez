import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { fetchCommentsByPostID, fetchPostDataByID } from "../utils";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
const View = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useState("");

  const { token } = useAuthContext();

  const fetchData = async () => {
    const response = await fetchPostDataByID(id);

    if (response) {
      setTitle(response.title);
      setDescription(response.description);

      await fetchComments();
    } else {
      console.log("No post found with ID ${id}");
    }
  };

  const fetchComments = async () => {
    const response = await fetchCommentsByPostID(id);

    if (response) {
      setComments(response);
    } else {
      console.log("Couldn't fetch the comments for the post");
    }
  };

  const sendComment = async () => {
    const url = "http://localhost:3000/comment";

    const data = {
      description: myComment,
      idPosteo: id,
    };

    const headers = {
      token: token,
    };
    try {
      const response = await axios.post(url, data, { headers: headers });

      if (response.status === 200) {
        setMyComment("");
        await fetchComments();
      } else {
        console.log({ error: "An unexpected error occurred" });
      }
    } catch (error) {
      console.log({ error: "An unexpected error occurred" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Card.Body>
        <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Button variant="primary">Edit</Button>
          </Card.Body>
        </Card>
      </Card.Body>

      <Card>
        <Card.Body>
          <Card.Title>Comments</Card.Title>
        </Card.Body>
        {comments.map((comment, key) => (
          <div key={key}>
            <Card>
              <Card.Body>
                <Card.Title>{comment.autor.username}</Card.Title>
                <Card.Text>{comment.description}</Card.Text>
                <Button variant="primary">Edit Comment</Button>
                <Button variant="danger">Eliminate Comment</Button>
              </Card.Body>
            </Card>
            <br />
          </div>
        ))}
        <br />

        <Card>
          <Card.Body>
            <Card.Title>Add Comment</Card.Title>
            <br />
            <FloatingLabel>
              <Form.Control
                onInput={(e) => setMyComment(e.target.value)}
                as="textarea"
                placeholder="Leave a comment here"
                value={myComment}
                style={{ height: "100px" }}
              />
            </FloatingLabel>
            <br />
            <Button variant="primary" onClick={sendComment}>
              Add
            </Button>
          </Card.Body>
        </Card>
      </Card>
    </>
  );
};

export default View;
