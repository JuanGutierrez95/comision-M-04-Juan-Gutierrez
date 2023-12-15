import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
const RegisterUserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleAvatarURLChange = (e) => {
    e.preventDefault();
    setAvatarURL(e.target.value);
  };

  const checkDate = async () => {
    let myErrors = {};

    if (username.trim().length === 0) {
      myErrors.username = "Please enter a username";
    } else if (username.trim().length < 3 || username.trim().length > 50) {
      myErrors.username =
        "The username must have at least 3 characters and at most 50 characters";
    }

    if (password.length === 0) {
      myErrors.password = "Please enter at least one password";
    } else if (password.length < 3 || password.length > 25) {
      myErrors.password =
        "The password must have at least 3 characters and at most 25 characters";
    }

    if (email.length === 0) {
      myErrors.email = "Please enter at least one email";
    }

    if (avatarURL.length === 0) {
      myErrors.avatarURL = "Please enter at least one avatar URL";
    }

    setErrors(myErrors);

    if (Object.entries(myErrors).length === 0) {
      setDisable(true);
    }

    await sendData();
  };

  const sendData = async () => {
    const url = "http://localhost:3000/user";

    const data = {
      username: username,
      password: password,
      email: email,
      avatarURL: avatarURL,
    };
    try {
      const response = await axios.post(url, data);

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
          Username
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Enter username"
            onInput={handleUsernameChange}
          >
            {errors.username && (
              <span style={{ color: "red" }}>{errors.username}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onInput={handlePasswordChange}
          >
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Enter email"
            onInput={handleEmailChange}
          >
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Avatar URL
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Enter avatar URL"
            onInput={handleAvatarURLChange}
          >
            {errors.avatarURL && (
              <span style={{ color: "red" }}>{errors.avatarURL}</span>
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
        Register User
      </Button>
    </Form>
  );
};

export default RegisterUserForm;
