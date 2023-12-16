import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuthContext } from "../context/AuthContext";
import logo from "../images/arg-programa.png";

function NavBar() {
  const { usuario, logout } = useAuthContext();

  const desconectarUsuario = () => {
    logout();
  };
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="Logo Arg Programa"
              src={logo}
              width="auto"
              height="30"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/">Inicio</Nav.Link>
            {usuario ? (
              <>
                <Nav.Link href="/crear">Crear Publicación</Nav.Link>
                <Nav.Link onClick={desconectarUsuario}>Desconectarse</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
                <Nav.Link href="/register">Registrar Usuario</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
