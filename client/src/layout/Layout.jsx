import React from "react";
import { Card } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <NavbarComponent />
      <div style={{ padding: 20, color: "red" }}>
        <Card>{children}</Card>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
