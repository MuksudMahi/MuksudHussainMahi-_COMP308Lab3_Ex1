import React, { useState, useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./Auth.css";
import NavBar from "../Nav/Nav";
import { gql, useQuery } from "@apollo/client";

toast.configure();

export default function AllStudents(props) {
  const GET_STUDENTS = gql`
    {
      getStudentList {
        students {
          studentNumber
        }
        students {
          firstName
        }
        students {
          lastName
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_STUDENTS);

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
          {data.getStudentList.students.map((item, idx) => (
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
