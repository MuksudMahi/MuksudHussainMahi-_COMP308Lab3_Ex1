import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Spinner,
  ListGroup,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./Auth.css";
import NavBar from "../Nav/Nav";
import auth from "../Auth/Auth";

import axios from "axios";

toast.configure();

export default function EditSection(props) {
  const location = useLocation();
  const [courseId, setCourseId] = useState(location.state.courseId);
  const [courseCode, setCourseCode] = useState(location.state.courseCode);
  const [courseName, setCourseName] = useState(location.state.courseName);
  const [section, setSection] = useState(location.state.section);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        courseId: courseId,
        section: section,
      },
      withCredentials: true,
      url: "http://localhost:3500/student/updatecourse",
    }).then((response) => {
      if (response.data.message === "session expired") {
        toast.error(response.data.message);
        auth.logout();
        navigate("/", { replace: true });
      } else {
        toast(response.data.message);
        navigate("/enrolled", { replace: true });
      }
    });
  };

  return (
    <div>
      <NavBar />
      <Form onSubmit={handleSubmit}>
        <h1>Update Section</h1>

        <Form.Group className="mb-3" size="lg" controlId="formCourseCode">
          <Form.Label>Course Code</Form.Label>
          <Form.Control type="text" value={courseCode} disabled={true} />
        </Form.Group>

        <Form.Group className="mb-3" size="lg" controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control type="text" value={courseName} disabled={true} />
        </Form.Group>

        <Form.Group className="mb-3" size="lg" controlId="formSection">
          <Form.Label>Section</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Section"
            onChange={(event) => setSection(event.target.value)}
            required={true}
            value={section}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
