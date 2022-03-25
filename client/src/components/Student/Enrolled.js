import React from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../Nav/Nav";
import { useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

toast.configure();

export default function EnrolledStudents(props) {
  const location = useLocation();
  const GET_ENROLLED_STUDENTS = gql`
    query showEnrolledStudents($id: String!) {
      showEnrolledStudents(id: $id) {
        students {
          studentNumber
          firstName
          lastName
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_ENROLLED_STUDENTS, {
    variables: { id: location.state.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <NavBar />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Number</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {data.showEnrolledStudents.students.map((item, idx) => (
            <tr key={idx}>
              <td>{item.studentNumber}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
