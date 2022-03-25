import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../Nav/Nav";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export const addCourseMutationGQL = gql`
  mutation CreateCourse(
    $courseCode: String!
    $courseName: String!
    $section: String
    $semester: String
  ) {
    createCourse(
      courseCode: $courseCode
      courseName: $courseName
      section: $section
      semester: $semester
    ) {
      status
    }
  }
`;

toast.configure();

export default function AddCourse(props) {
  const [courseCode, setCourseCode] = useState();
  const [courseName, setCourseName] = useState();
  const [sections, setSections] = useState();
  const [semester, setSemester] = useState();

  const navigate = useNavigate();

  const [mutation, mutationResults] = useMutation(addCourseMutationGQL, {
    onCompleted: (data) => {
      navigate("/allcourses");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation({
      variables: {
        courseCode: courseCode,
        courseName: courseName,
        section: sections,
        semester: semester,
      },
    });
  };

  return (
    <div>
      <NavBar />
      <Form onSubmit={handleSubmit}>
        <h1>Add Course</h1>
        <br />
        <Form.Group className="mb-3" size="lg" controlId="formCourseCode">
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Course Code"
            onChange={(event) => setCourseCode(event.target.value)}
            required={true}
          />
        </Form.Group>

        <Form.Group className="mb-3" size="lg" controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Course Name"
            onChange={(event) => setCourseName(event.target.value)}
            required={true}
          />
        </Form.Group>

        <Form.Group className="mb-3" size="lg" controlId="formCourseSection">
          <Form.Label>Number of sections</Form.Label>
          <Form.Control
            type="number"
            placeholder="Sections"
            onChange={(event) => setSections(event.target.value)}
            required={true}
          />
        </Form.Group>

        <Form.Group controlId="formSemester">
          <Form.Label>Semester</Form.Label>
          <Form.Select
            value={semester}
            onChange={(event) => setSemester(event.target.value)}
            required={true}
          >
            <option value="Winter">Winter</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
}
