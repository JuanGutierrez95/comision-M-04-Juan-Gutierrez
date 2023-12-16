import React from "react";
import { Route, Routes } from "react-router-dom";
import Inicio from "../views/Inicio";
import RegistrarUsuario from "../views/RegistrarUsuario";
import CrearPosteo from "../views/CrearPosteo";
import Eliminar from "../views/Eliminar";
import Editar from "../views/Editar";
import Ver from "../views/Ver";
import Login from "../views/Login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/register" element={<RegistrarUsuario />} />
      <Route path="/crear" element={<CrearPosteo />} />
      <Route path="/eliminar/:id" element={<Eliminar />} />
      <Route path="/editar/:id" element={<Editar />} />
      <Route path="/ver/:id" element={<Ver />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Inicio />} />
    </Routes>
  );
};

export default AppRouter;
