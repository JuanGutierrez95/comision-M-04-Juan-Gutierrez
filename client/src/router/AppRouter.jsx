import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import RegisterUser from "../views/RegisterUser";
import PostCreate from "../views/PostCreate";
import Eliminate from "../views/Eliminate";
import Edit from "../views/Edit";
import View from "../views/View";
import Login from "../views/Login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterUser />}></Route>
      <Route path="/create" element={<PostCreate />}></Route>
      <Route path="/eliminate/:id" element={<Eliminate />}></Route>
      <Route path="/edit/:id" element={<Edit />}></Route>
      <Route path="/view/:id" element={<View />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default AppRouter;
