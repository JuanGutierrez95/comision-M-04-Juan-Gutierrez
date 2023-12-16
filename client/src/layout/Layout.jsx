import { Card } from "react-bootstrap";
import NavBar from "../components/NavBar";

const Layout = (props) => {
  const children = props.children;
  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <Card>{children}</Card>
      </div>
    </>
  );
};

export default Layout;
