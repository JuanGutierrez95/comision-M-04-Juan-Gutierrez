import React from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Card } from "react-bootstrap";
import EditForm from "../Form/EditForm";

const Edit = () => {
  const { id } = useParams();

  const { toke, username } = useAuthContext();
  return (
    <Card.Body>
      <EditForm id={id} username={username} token={toke} />
    </Card.Body>
  );
};

export default Edit;
