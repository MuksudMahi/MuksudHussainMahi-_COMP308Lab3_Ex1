import { Nav, Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from "react";
import auth from "../Auth/Auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  let navigate = useNavigate();
  let handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3500/student/logout",
    }).then((res) => {
      //setData(res.data);
      auth.logout();
      navigate("/", { replace: true });
      //console.log(res.data);
    });
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Course Registration</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/addcourse">Add Course</Nav.Link>
              <Nav.Link href="/enrolled">Enrolled Courses</Nav.Link>
              <Nav.Link href="/allcourses">All Courses</Nav.Link>
              <Nav.Link href="/allstudents">All Students</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleSubmit}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
