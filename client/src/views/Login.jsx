import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import axios from "axios";
import { guardarDatos, guardarToken } from "../utils/login";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
  const [errores, setErrores] = useState({});

  const navigate = useNavigate();
  const { login } = useAuthContext();

  const cambiarUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const cambiarPassword = (e) => {
    setPassword(e.target.value);
  };

  const verificarDatos = async () => {
    let misErrores = {};

    if (usuario.length === 0) {
      misErrores.usuario = "Debe introducir un usuario";
    }

    if (password.length === 0) {
      misErrores.password = "Debe introducir una contraseña";
    }

    setErrores(misErrores);

    if (Object.entries(misErrores).length === 0) {
      setDeshabilitarBoton(true);

      await mandarDatos();
    }
  };
  const mandarDatos = async () => {
    const url = "http://localhost:3000/autenticar";

    const datos = {
      usuario: usuario,
      password: password,
    };

    try {
      const respuesta = await axios.post(url, datos);

      if (respuesta.status === 200) {
       
        const { datos, token } = respuesta.data;
        login(datos, token);
        navigate("/");
      } else {
        setErrores({
          error: "Los datos ingresados no son válidos",
        });
      }
    } catch (error) {
      setErrores({
        error: "Ocurrio un error inesperado",
      });
    }
    setDeshabilitarBoton(false);
  };
  return (
    <Card.Body>
      <Form>
        <Form.Group className="mb-3" controlId="usuario">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Usuario"
            onInput={cambiarUsuario}
          />
          {errores.usuario && (
            <Form.Text style={{ color: "red" }}>{errores.usuario}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="contraseña">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            onInput={cambiarPassword}
          />
          {errores.password && (
            <Form.Text style={{ color: "red" }}>
              {errores.password}
            </Form.Text>
          )}
        </Form.Group>

        {errores.error && <Alert variant="danger">{errores.error}</Alert>}
        <Button
          variant="primary"
          type="submit"
          onClick={verificarDatos}
          disabled={deshabilitarBoton}
        >
          Ingresar
        </Button>
      </Form>
    </Card.Body>
  );
};

export default Login;
