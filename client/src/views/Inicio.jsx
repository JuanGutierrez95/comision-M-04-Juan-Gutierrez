//import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import TablaDeDatos from "../components/TablaDeDatos";
import { useAuthContext } from "../context/AuthContext";

const Inicio = () => {
  const [lista, setLista] = useState([]);

  const { usuario } = useAuthContext();

  const cargarLista = async () => {
   

    const url = "http://localhost:3000/publicaciones";
   
    let respuesta = await fetch(url);

    if (respuesta.status === 200) {
      respuesta = await respuesta.json();
    }
    setLista(respuesta);
    
  };

  useEffect(() => {
    cargarLista();
   
  }, []);

  return (
    <Card.Body>
      {usuario
        ? ("Welcome " + usuario.nombres + " " + usuario.apellidos + "!")
        : "No se inició sesión."}
      <TablaDeDatos lista={lista} usuario={usuario} />
    </Card.Body>
  );
};

export default Inicio;
