import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormularioRegistrarUsuario = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [deshabilitarBoton, setDeshabilitirBoton] = useState(false);
  const [errores, setErrores] = useState({});

  const navigate = useNavigate();

  const cambiarUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const cambiarPassword = (e) => {
    setPassword(e.target.value);
  };

  const cambiarNombres = (e) => {
    setNombres(e.target.value);
  };
  const cambiarApellidos = (e) => {
    setApellidos(e.target.value);
  };

  const cambiarEmail = (e) => {
    setEmail(e.target.value);
  };

  const cambiarAvatarURL = (e) => {
    setAvatarURL(e.target.value);
  };
  const verificarDatos = async () => {
    let misErrores = {};

    if (usuario.length === 0) {
      misErrores.usuario = "Debe introducir un usuario";
     
    }

    if (password.length === 0) {
      misErrores.password = "Debe introducir una contraseña";
      
    }

    if (nombres.length === 0) {
      misErrores.nombres = "Debe introducir al menos un nombre";
    
    }

    if (apellidos.length === 0) {
      misErrores.apellidos = "Debe introducir al menos un apellido";
      
    }
    if (email.length === 0) {
      misErrores.email = "Debe introducir un email";
     
    }

    if (avatarURL.length === 0) {
      misErrores.avatarURL = "Debe introducir una imagen";
      
    }

    setErrores(misErrores);
    

    if (Object.entries(misErrores).length === 0) {
      setDeshabilitirBoton(true);
   

      await mandarDatos();
    }
  };


  const mandarDatos = async () => {
    const url = "http://localhost:3000/usuario";

    const datos = {
      usuario: usuario,
      password: password,
      nombres: nombres,
      apellidos: apellidos,
      email: email,
      avatarURL: avatarURL,
    };
    try {
      const respuesta = await axios.post(url, datos);

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
          Usuario
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Usuario"
            onInput={cambiarUsuario}
          >
            {errores.usuario && (
              <span style={{ color: "red" }}>{errores.usuario}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Contraseña
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="password"
            placeholder="Password"
            onInput={cambiarPassword}
          >
            {errores.password && (
              <span style={{ color: "red" }}>{errores.password}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Nombres
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Nombres"
            onInput={cambiarNombres}
          >
            {errores.nombres && (
              <span style={{ color: "red" }}>{errores.nombres}</span>
            )}
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Apellidos
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Apellidos"
            onInput={cambiarApellidos}
          />
        </Col>
        {errores.apellidos && (
          <span style={{ color: "red" }}>{errores.apellidos}</span>
        )}
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Email"
            onInput={cambiarEmail}
          />
        </Col>
        {errores.email && <span style={{ color: "red" }}>{errores.email}</span>}
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Avatar
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Avatar"
            onInput={cambiarAvatarURL}
          />
        </Col>
        {errores.avatarURL && (
          <span style={{ color: "red" }}>{errores.avatarURL}</span>
        )}
      </Form.Group>

      {errores.error && <Alert variant="danger">{errores.error}</Alert>}

      <Button
        variant="primary"
        type="submit"
        onClick={verificarDatos}
        disabled={deshabilitarBoton}
      >
        Registrar usuario
      </Button>
    </Form>
  );
};

export default FormularioRegistrarUsuario;
