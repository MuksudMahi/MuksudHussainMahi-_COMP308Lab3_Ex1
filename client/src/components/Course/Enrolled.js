import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUserToken } from "../../config/auth";
import { useMutation } from "@apollo/react-hooks";

import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../Nav/Nav";
import { gql, useQuery } from "@apollo/client";

toast.configure();

export default function EnrolledCourses(props) {
  useEffect(() => {
    refetch();
  }, []);

  const GET_ENROLLED_COURSES = gql`
    query getStudentCourses($id: String!) {
      getStudentCourses(id: $id) {
        courses {
          _id {
            _id
            courseCode
            courseName
            section
          }
          section
        }
      }
    }
  `;
  const DROP_COURSE = gql`
    mutation dropCourse($studentId: String!, $courseId: String!) {
      dropCourse(studentId: $studentId, courseId: $courseId) {
        message
        status
      }
    }
  `;

  const [mutation, mutationResults] = useMutation(DROP_COURSE, {
    onCompleted: (data) => {
      refetch();
    },
  });

  const navigate = useNavigate();
  const [authUserToken] = useAuthUserToken();
  const { loading, error, data, refetch } = useQuery(GET_ENROLLED_COURSES, {
    variables: { id: authUserToken },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const dropCourse = (id) => {
    mutation({
      variables: {
        studentId: authUserToken,
        courseId: id,
      },
    });
  };

  return (
    <div>
      <NavBar />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.getStudentCourses.courses.map((item, idx) => (
            <tr key={idx}>
              <td>{item._id.courseCode}</td>
              <td>{item._id.courseName}</td>
              <td>{item.section}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    dropCourse(item._id._id);
                  }}
                >
                  Drop
                </Button>
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => {
                    navigate("/edit", {
                      state: {
                        courseId: item._id._id,
                        courseCode: item._id.courseCode,
                        courseName: item._id.courseName,
                        section: item.section,
                      },
                    });
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
