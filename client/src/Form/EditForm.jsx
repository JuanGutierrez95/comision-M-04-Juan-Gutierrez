import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { fetchPostDataByID } from "../utils/llamados.js";
const EditForm = (props) => {
  const { id, token, username } = props;
  const url = "http://localhost:3000/post";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const checkDate = async () => {
    let myErrors = {};

    const titleRegex = /^[a-zA-Z0-9\s]*$/;
    if (title.trim().length === 0) {
      myErrors.title = "Please enter at least one title";
    } else if (title.trim().length < 3 || title.trim().length > 50) {
      myErrors.title =
        "The title must have at least 3 characters and at most 50 characters";
    } else if (!title.match(titleRegex)) {
      myErrors.title = "The title must not contain special characters";
    }

    const descriptionRegex = /^[a-zA-Z0-9\s]*$/;
    if (description.trim().length === 0) {
      myErrors.description = "Please enter at least one description";
    } else if (
      description.trim().length < 3 ||
      description.trim().length > 500
    ) {
      myErrors.description =
        "The description must have at least 3 characters and at most 500 characters";
    } else if (!description.match(descriptionRegex)) {
      myErrors.description =
        "The description must not contain special characters";
    }

    setErrors(myErrors);

    if (Object.entries(myErrors).length === 0) {
      setDisableButton(true);

      await sendData();
    }
  };

  const sendData = async () => {
    const data = {
      id: id,
      title: title,
      description: description,
    };

    const headers = {
      token: token,
    };
    try {
      const response = await axios.put(url, data, { headers: headers });
      if (response.status === 200) {
        return navigate("/");
      } else {
        setErrors({ error: "An unexpected error occurred" });
      }
    } catch (error) {
      setErrors({ error: "An unexpected error occurred" });
    }
    setDisableButton(false);
  };

  const fetchData = async () => {
    if (username) {
      const response = await fetchPostDataByID(id);
      if (response) {
        if (username.id !== response.autor) {
          return navigate("/");
        }
        setTitle(response.title);
        setDescription(response.description);
      } else {
        setErrors({
          error:
            "An unexpected error occurred. Couldn't retrieve the publication",
        });
        setDisableButton(false);
      }
    } else {
      return navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Title
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Title"
            onInput={handleTitleChange}
            defaultValue={title}
          >
            {errors.title && (
              <span style={{ color: "red" }}>{errors.title}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          onInput={handleDescriptionChange}
          defaultValue={description}
        />
        {errors.description && (
          <span style={{ color: "red" }}>{errors.description}</span>
        )}
      </Form.Group>

      {errors.error && <Alert variant="danger">{errors.error}</Alert>}

      <Button
        variant="primary"
        type="submit"
        onClick={checkDate}
        disabled={disableButton}
      >
        Edit publication
      </Button>
    </Form>
  );
};

export default EditForm;
