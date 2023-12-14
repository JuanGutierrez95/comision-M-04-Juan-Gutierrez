import React from "react";
import { Card } from "react-bootstrap";
import NavBar from "../components/NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div style={{ padding: 20, color: "red" }}>
        <Card>{children}</Card>
      </div>
    </>
  );
};

export default Layout;
