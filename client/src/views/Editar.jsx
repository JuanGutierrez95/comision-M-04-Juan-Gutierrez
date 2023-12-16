import React from "react";
import { Card } from "react-bootstrap";
import FormEditar from "../Form/FormEditar";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Editar = () => {
  const { id } = useParams();

  const { token, usuario } = useAuthContext();

  return (
    <Card.Body>
      <FormEditar id={id} token={token} usuario={usuario} />
    </Card.Body>
  );
};

export default Editar;
