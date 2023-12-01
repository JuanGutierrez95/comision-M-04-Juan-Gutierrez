import { createBrowserRouter } from "react-router-dom";
import Inicio from "./views/Inicio";
import Login from "./views/Login";
import Register from "./views/Register";
import Post from "./views/Post";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/post",
    element: <Post />,
  },
]);

export default routes;
