import axios from "axios";
import { useState } from "react";
import { Alert, Button, ButtonGroup, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
const Eliminar = () => {
  const [error, setError] = useState(false);
  const [deshabilitarBoton, setDeshabilitirBoton] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const volver = () => {
    navigate("/");
  };

  const eliminar = async () => {
    setError(false);
    setDeshabilitirBoton(true);

    try {
      
      const url = "http://localhost:3000/publicacion";
      
      const respuesta = await axios.delete(url, {
        data: { id: id },
      });

      if (respuesta.status === 200) {
        return navigate("/");
      } else {
        setError("Ocurrio un error inesperado");
      }
    } catch (error) {
      setError("Ocurrio un error inesperado");
    }

    setDeshabilitirBoton(false);
  };

  return (
    <Card.Body>
      <Alert variant="warning">
        ¿Está seguro de eliminar este usuario con ID {id}?
      </Alert>
      {error && <Alert variant="danger">{error}</Alert>}
      <ButtonGroup>
        <Button variant="primary" onClick={volver} disabled={deshabilitarBoton}>
          Volver
        </Button>
        <Button
          variant="danger"
          onClick={eliminar}
          disabled={deshabilitarBoton}
        >
          Eliminar
        </Button>
      </ButtonGroup>
    </Card.Body>
  );
};

export default Eliminar;
