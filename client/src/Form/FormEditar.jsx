import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { traerDatosDePosteoPorID } from "../utils/llamados.js";
const FormEditar = (props) => {
  const { id, usuario, token } = props;
  const url = "http://localhost:3000/publicacion";
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [deshabilitarBoton, setDeshabilitirBoton] = useState(false);
  const [errores, setErrores] = useState({});

  const navigate = useNavigate();

  const volver = (id) => {
    navigate("/");
  };

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
      misErrores.titulo = "Debe introducir al menos un titulo";
      console.log(misErrores.titulo);
    }

    if (descripcion.length === 0) {
      misErrores.descripcion = "Debe introducir al menos una descripcion";
      console.log(misErrores.descripcion);
    }
    if (imageURL.length === 0) {
      misErrores.imageURL = "Debe introducir una imagen";
      console.log(misErrores.imageURL);
    }

    setErrores(misErrores);

    if (Object.entries(misErrores).length === 0) {
      setDeshabilitirBoton(true);
      console.log(titulo);
      console.log(descripcion);

      await mandarDatos();
    }
  };

  const mandarDatos = async () => {
    const datos = {
      id: id,
      titulo: titulo,
      descripcion: descripcion,
      imageURL: imageURL,
    };

    const headers = {
      token: token,
    };
    try {
      const respuesta = await axios.put(url, datos, { headers: headers });

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

  const traerDatos = async () => {
    if (usuario) {
      const respuesta = await traerDatosDePosteoPorID(id);

      if (respuesta) {
        if (usuario.id !== respuesta.autor) {
          return navigate("/");
        }
        setTitulo(respuesta.titulo);
        setDescripcion(respuesta.descripcion);
      } else {
        setErrores({
          error:
            "Ocurrio un error inesperado. No se pudo obtener la publicacion",
        });
        setDeshabilitirBoton(true);
      }
    } else {
      return navigate("/");
    }
  };

  useEffect(() => {
    traerDatos();
  }, []);
  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Titulo
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Titulo"
            onInput={cambiarTitulo}
            defaultValue={titulo}
          >
            {errores.titulo && (
              <span style={{ color: "red" }}>{errores.titulo}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Descripcion
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Descripcion"
            onInput={cambiarDescripcion}
            defaultValue={descripcion}
          />
        </Col>
        {errores.descripcion && (
          <span style={{ color: "red" }}>{errores.descripcion}</span>
        )}
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
        Editar publicacion
      </Button>
      <Button variant="success" type="submit" onClick={volver}>
        Volver
      </Button>
    </Form>
  );
};

export default FormEditar;
