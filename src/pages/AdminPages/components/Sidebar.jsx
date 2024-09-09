import React, { useState } from "react";
import { Offcanvas, Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleSelectMenu = (url) => {
    setShow(false);
    navigate(url);
  };

  const NavbarContent = () => {
    return (
      <div>
        <Link to="/">
          <img width={250} src="/image/logo.png" alt="logo.png" />
        </Link>
        <div className="sidebar-title">Admin Account</div>
        <ul className="sidebar-area">
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu("/admin/product?page=1")}
          >
            product
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleSelectMenu("/admin/order?page=1")}
          >
            order
          </li>
        </ul>
      </div>
    );
  };
  return (
    <>
      <div className="sidebar-toggle">{NavbarContent()}</div>

      <Navbar bg="light" expand={false} className="mobile-sidebar-toggle">
        <Container fluid>
          <Navbar.Brand href="/">
            <img width={250} src="/image/logo.png" alt="logo.png" />
          </Navbar.Brand>
          <Navbar.Toggle onClick={() => setShow(true)} />
          <Navbar.Offcanvas placement="start" className="sidebar" show={show}>
            <Offcanvas.Header
              closeButton
              onClick={() => setShow(false)}
            ></Offcanvas.Header>
            <Offcanvas.Body>{NavbarContent()}</Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Sidebar;
