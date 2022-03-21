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

import axios from "axios";

toast.configure();

export default function EnrolledStudents(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      //   const result = await axios(
      //     "http://localhost:3500/course/students/" + location.state.id
      //   );
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3500/course/students/" + location.state.id,
      }).then((res) => {
        if (res.data.message === "session expired") {
          toast.error(res.data.message);
          navigate("/", { replace: true });
        } else {
          setData(res.data);
          setShowLoading(false);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Number</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr>
              <td>{item.studentNumber}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
            </tr>
          ))}{" "}
        </tbody>
      </Table>
    </div>
  );
}
