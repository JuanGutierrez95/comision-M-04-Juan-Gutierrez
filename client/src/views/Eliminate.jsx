import React, { useState } from "react";
import { Alert, Button, ButtonGroup, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Eliminate = () => {
  const [error, setError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const regress = async () => {
    navigate("/");
  };

  const eliminate = async () => {
    setError(false);
    setDisableButton(true);
    try {
      const url = "http://localhost:3000/post";

      const response = await axios.delete(url, {
        data: { id: id },
      });

      if (response.status === 200) {
        return navigate("/");
      } else {
        setError("An unexpected error occurred");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
    setDisableButton(false);
  };
  return (
    <Card.Body>
      <Alert variant="warning">
        Are you sure you want to delete this user with ID {id}?
      </Alert>
      {error && <Alert variant="danger">{error}</Alert>}
      <ButtonGroup>
        <Button
          variant="primary"
          onClick={regress}
          disabled={disableButton}
          className="me-2"
        >
          Regress
        </Button>
        <Button
          variant="danger"
          onClick={eliminate}
          disabled={disableButton}
          className="me-2"
        >
          Eliminate
        </Button>
      </ButtonGroup>
    </Card.Body>
  );
};

export default Eliminate;
