import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../Nav/Nav";
import { gql, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { useAuthUserToken } from "../../config/auth";

toast.configure();

export default function AllCourses(props) {
  useEffect(() => {
    refetch();
  }, []);
  const [Enrolled, setEnrolled] = useState([]);
  const GET_ALLCOURSES = gql`
    {
      showCourseList {
        _id
        courseCode
        courseName
      }
    }
  `;

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
        }
      }
    }
  `;

  const ENROLL_STUDENT = gql`
    mutation enrollCourse($studentId: String!, $courseId: String!) {
      enrollCourse(studentId: $studentId, courseId: $courseId) {
        message
        status
      }
    }
  `;

  const DELETE_COURSE = gql`
    mutation deleteCourse($studentId: String!, $courseId: String!) {
      deleteCourse(studentId: $studentId, courseId: $courseId) {
        message
        status
      }
    }
  `;

  let temp = [];
  const [authUserToken] = useAuthUserToken();
  const result = useQuery(GET_ENROLLED_COURSES, {
    variables: { id: authUserToken },
    onCompleted: (data) => {
      data.getStudentCourses.courses.map((item, idx) => {
        temp.push(item._id._id);
      });
      setEnrolled(temp);
    },
  });

  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_ALLCOURSES);

  const [mutation, mutationResults] = useMutation(ENROLL_STUDENT, {
    onCompleted: (data) => {
      result.refetch();
    },
  });

  const [mutationDelete, deleteMutationResults] = useMutation(DELETE_COURSE, {
    onCompleted: (data) => {
      console.log("Here");
      refetch();
      result.refetch();
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const enrollStudent = (event, id) => {
    mutation({
      variables: {
        studentId: authUserToken,
        courseId: id,
      },
    });
  };

  const deleteCourse = (id) => {
    console.log(id);
    mutationDelete({
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
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.showCourseList.map((item, idx) => (
            <tr key={idx}>
              <td>{item.courseCode}</td>
              <td>{item.courseName}</td>
              <td>
                {!Enrolled.includes(item._id) ? (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={(event) => {
                      enrollStudent(event, item._id);
                    }}
                  >
                    Enroll
                  </Button>
                ) : (
                  <Button variant="success" size="sm" disabled={true}>
                    Enrolled
                  </Button>
                )}
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => {
                    navigate("/enrolledstudents", { state: { id: item._id } });
                  }}
                >
                  Enrolled Students
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    deleteCourse(item._id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
