import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const FormularioCrearPosteo = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [deshabilitarBoton, setDeshabilitirBoton] = useState(false);
  const [errores, setErrores] = useState({});

  const navigate = useNavigate();
  const { token } = useAuthContext();

  const cambiarTitulo = (e) => {
    setTitulo(e.target.value);
  };

  const cambiarDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  const cambiarImageURL = (e) => {
    setImageURL(e.target.value);
  };

  const verificarDatos = async () => {
    let misErrores = {};

    if (titulo.length === 0) {
      misErrores.titulo = "Debe introducir un titulo";
      
    }

    if (descripcion.length === 0) {
      misErrores.descripcion = "Debe introducir una descripcion";
      
    }
    if (imageURL.length === 0) {
      misErrores.imageURL = "Debe introducir una imagen";
   
    }

    setErrores(misErrores);
   

    if (Object.entries(misErrores).length === 0) {
      setDeshabilitirBoton(true);
    

      await mandarDatos();
    }
  };


  const mandarDatos = async () => {
    const url = "http://localhost:3000/publicacion";

    const datos = {
      titulo: titulo,
      descripcion: descripcion,
      imageURL: imageURL,
    };

    const headers = {
      token: token,
    };
    try {
      const respuesta = await axios.post(url, datos, { headers: headers });

      if (respuesta.status === 200) {
        return navigate("/");
      } else {
        setErrores({ error: "Ocurrió un error inesperado" });
      }
    } catch (error) {
      setErrores({ error: "Ocurrio un error inesperado" });
    }
    setDeshabilitirBoton(false);
  };

  return (
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Titulo
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Titulo"
            onInput={cambiarTitulo}
          >
            {errores.titulo && (
              <span style={{ color: "red" }}>{errores.titulo}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Descripcion
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Descripcion"
            onInput={cambiarDescripcion}
          >
            {errores.descripcion && (
              <span style={{ color: "red" }}>{errores.descripcion}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Image
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Image URL"
            onInput={cambiarImageURL}
          />
        </Col>
        {errores.imageURL && (
          <span style={{ color: "red" }}>{errores.imageURL}</span>
        )}
      </Form.Group>
      {errores.error && <Alert variant="danger">{errores.error}</Alert>}

      <Button
        variant="primary"
        type="submit"
        onClick={verificarDatos}
        disabled={deshabilitarBoton}
      >
        Crear publicación
      </Button>
    </Form>
  );
};

export default FormularioCrearPosteo;
