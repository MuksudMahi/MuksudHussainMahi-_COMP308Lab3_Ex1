import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function EnrolledCourses(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      //const result = await axios("http://localhost:3500/student/courses");
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3500/student/courses",
      }).then((res) => {
        if (res.data.message === "session expired") {
          toast.error(res.data.message);
          auth.logout();
          navigate("/", { replace: true });
        } else {
          setData(res.data);
          setShowLoading(false);
        }
      });
    };

    fetchData();
  }, [showLoading]);

  const drop = (id) => {
    console.log("I am here");
    axios({
      method: "POST",
      data: {
        courseId: id,
      },
      withCredentials: true,
      url: "http://localhost:3500/student/dropcourse",
    }).then((res) => {
      console.log(res);
      if (res.data.message === "session expired") {
        auth.logout();
        toast.error(res.data.message);
        navigate("/", { replace: true });
      } else {
        toast.success(res.data.message);
        setShowLoading(true);
      }
    });
  };

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
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr>
              <td>{item._id.courseCode}</td>
              <td>{item._id.courseName}</td>
              <td>{item.section}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    drop(item._id._id);
                  }}
                >
                  Drop
                </Button>
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() =>
                    navigate("/edit", {
                      state: {
                        courseId: item._id._id,
                        courseCode: item._id.courseCode,
                        courseName: item._id.courseName,
                        section: item.section,
                      },
                    })
                  }
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}{" "}
        </tbody>
      </Table>
    </div>
  );
}
