import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../Nav/Nav";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
import { useAuthUserToken } from "../../config/auth";

toast.configure();

export default function EditSection(props) {
  const location = useLocation();
  const [courseId, setCourseId] = useState(location.state.courseId);
  const [courseCode, setCourseCode] = useState(location.state.courseCode);
  const [courseName, setCourseName] = useState(location.state.courseName);
  const [section, setSection] = useState(location.state.section);
  const navigate = useNavigate();

  const UPDATE_COURSE = gql`
    mutation updateCourse(
      $studentId: String!
      $courseId: String!
      $section: String!
    ) {
      updateCourse(
        studentId: $studentId
        courseId: $courseId
        section: $section
      ) {
        message
        status
      }
    }
  `;
  const [authUserToken] = useAuthUserToken();
  const [mutation, mutationResults] = useMutation(UPDATE_COURSE, {
    onCompleted: (data) => {
      navigate("/enrolled");
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(section);
    mutation({
      variables: {
        studentId: authUserToken,
        courseId: courseId,
        section: section,
      },
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
