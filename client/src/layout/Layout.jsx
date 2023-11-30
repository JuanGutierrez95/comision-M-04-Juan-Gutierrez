import React from "react";
import { Card } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";

const Layout = ({ children }) => {
  return (
    <>
      <NavbarComponent />
      <div style={{ padding: 20, color: "red" }}>
        <Card>{children}</Card>
      </div>
    </>
  );
};

export default Layout;
