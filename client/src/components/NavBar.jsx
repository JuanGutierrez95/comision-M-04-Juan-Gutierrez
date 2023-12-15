import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/arg-programa.png";
import { useAuthContext } from "../context/AuthContext";
const NavBar = () => {
  const { username, logout } = useAuthContext();

  const handleLogoutChange = () => {
    logout();
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
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
            <Nav.Link href="/">Home</Nav.Link>
            {username ? (
              <>
                <Nav.Link href="/create">Post Create</Nav.Link>
                <Nav.Link onClick={handleLogoutChange}>Log out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Log in</Nav.Link>
                <Nav.Link href="/register">Register User</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
