import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleUsernameChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const checkData = async () => {
    let myErrors = {};

    if (username.trim().length === 0) {
      myErrors.username = "Please enter a username";
    }

    if (password.length === 0) {
      myErrors.password = "Please enter a password";
    }

    setErrors(myErrors);

    if (Object.entries(myErrors).length === 0) {
      setDisableButton(true);

      await sendData();
    }
  };

  const sendData = async () => {
    const url = "http://localhost:3000/autenticar";

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(url, data);

      if (response.status === 200) {
        const { data, token } = response.data;
        login(data, token);
        navigate("/");
      }
    } catch (error) {
      setErrors({
        error: "An unexpected error occurred",
      });
    }
    setDisableButton(false);
  };

  return (
    <Card.Body>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onInput={handleUsernameChange}
          />
          {errors.username && (
            <Form.Text style={{ color: "red" }}>{errors.username}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onInput={handlePasswordChange}
          />
          {errors.password && (
            <Form.Text style={{ color: "red" }}>{errors.password}</Form.Text>
          )}
        </Form.Group>
        {errors.error && <Alert variant="danger">{errors.error}</Alert>}
        <Button
          variant="primary"
          type="submit"
          onClick={checkData}
          disabled={disableButton}
        >
          Enter
        </Button>
      </Form>
    </Card.Body>
  );
};

export default Login;
