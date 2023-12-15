import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";
const PostCreateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ imgURL, setImgURL] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { token } = useAuthContext();

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleImgURLChange = (e) => {
    e.preventDefault();
    setImgURL(e.target.value);
  }

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

    if(imgURL.length === 0) {
      myErrors.imgURL = "Please enter at least one imgURL";
    }

    setErrors(myErrors);

    if (Object.entries(myErrors).length === 0) {
      setDisableButton(true);

      await sendData();
    }
  };

  const sendData = async () => {
    const url = "http://localhost:3000/post";

    const data = {
      title: title,
      description: description,
      imgURL: imgURL
    };

    const headers = {
      token: token,
    };
    try {
      const response = await axios.post(url, data, { headers: headers });

      if (response.status === 200) {
        navigate("/");
      } else {
        setErrors({ error: "An unexpected error occurred" });
      }
    } catch (error) {
      setErrors({ error: "An unexpected error occurred" });
    }
    setDisableButton(false);
  };

  return (
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Title
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" onChange={handleTitleChange}>
            {errors.title && (
              <span style={{ color: "red" }}>{errors.title}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={handleDescriptionChange}
          >
            {errors.description && (
              <span style={{ color: "red" }}>{errors.description}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          ImgURL
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="ImgURL"
            onChange={handleImgURLChange}
          >
            {errors.imgURL && (
              <span style={{ color: "red" }}>{errors.imgURL}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>
      {errors.error && <Alert variant="danger">{errors.error}</Alert>}

      <Button
        variant="primary"
        type="submit"
        onClick={checkDate}
        disabled={disableButton}
      >
        Post Create
      </Button>
    </Form>
  );
};

export default PostCreateForm;
