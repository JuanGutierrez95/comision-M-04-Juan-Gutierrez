import React from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Card } from "react-bootstrap";
import EditForm from "../Form/EditForm";

const Edit = () => {
  const { id } = useParams();

  const { token, username } = useAuthContext();
  return (
    <Card.Body>
      <EditForm id={id} username={username} token={token} />
    </Card.Body>
  );
};

export default Edit;
