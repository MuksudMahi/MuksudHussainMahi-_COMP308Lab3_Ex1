import { Nav, Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLogout } from "../../config/auth";

import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  let logout = useLogout();
  let navigate = useNavigate();
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            Course Registration
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/addcourse")}>
                Add Course
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/enrolled")}>
                Enrolled Courses
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/allcourses")}>
                All Courses
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/allstudents")}>
                All Students
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
