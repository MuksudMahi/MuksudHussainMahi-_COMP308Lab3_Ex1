import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./Auth.css";
import NavBar from "../Nav/Nav";
import auth from "../Auth/Auth";

import axios from "axios";
import { gql, useQuery } from "@apollo/client";

toast.configure();

export default function AllCourses(props) {
  const GET_ALLCOURSES = gql`
  {
    showCourseList
    {
      courseCode,
      courseName
    }
  }
  `;
  // const [data, setData] = useState([]);
  // const [showLoading, setShowLoading] = useState(true);
  // const [Enrolled, setEnrolled] = useState([]);

  // const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_ALLCOURSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // useEffect(() => {
  //   const fetchData = () => {
  //     axios({
  //       method: "GET",
  //       withCredentials: true,
  //       url: "http://localhost:3500/course",
  //     }).then((result) => {
  //       if (result.data.message === "session expired") {
  //         toast.error(result.data.message);
  //         auth.logout();
  //         navigate("/", { replace: true });
  //       } else {
  //         setData(result.data);
  //         setShowLoading(false);
  //       }
  //     });
  //     //const result = await axios("http://localhost:3500/course");
  //   };

  //   const getStudentCourses = () => {
  //     let temp = [];
  //     axios({
  //       method: "GET",
  //       withCredentials: true,
  //       url: "http://localhost:3500/student/courses",
  //     }).then((res) => {
  //       if (res.data.message === "session expired") {
  //         toast.error(res.data.message);
  //         auth.logout();
  //         navigate("/", { replace: true });
  //       } else {
  //         res.data.map((item, idx) => {
  //           temp.push(item._id._id);
  //         });
  //         setEnrolled(temp);
  //       }
  //     });
  //   };
  //   fetchData();
  //   getStudentCourses();
  // }, [showLoading]);

  // const enroll = (id) => {
  //   axios({
  //     method: "POST",
  //     data: {
  //       courseId: id,
  //     },
  //     withCredentials: true,
  //     url: "http://localhost:3500/student/addcourse",
  //   }).then((res) => {
  //     if (res.data.message === "session expired") {
  //       toast.error(res.data.message);
  //       auth.logout();
  //       navigate("/", { replace: true });
  //     } else setShowLoading(true);
  //   });
  // };

  // const drop = (id) => {
  //   axios({
  //     method: "POST",
  //     data: {
  //       courseId: id,
  //     },
  //     withCredentials: true,
  //     url: "http://localhost:3500/student/dropcourse",
  //   }).then((res) => {
  //     if (res.data.message === "session expired") {
  //       toast.error(res.data.message);
  //       auth.logout();
  //       navigate("/", { replace: true });
  //     } else setShowLoading(true);
  //   });
  // };

  // const deleteCourse = async (id) => {
  //   drop(id);
  //   axios({
  //     method: "POST",
  //     data: {
  //       courseId: id,
  //     },
  //     withCredentials: true,
  //     url: "http://localhost:3500/course/delete",
  //   }).then((res) => {
  //     if (res.data.message === "session expired") {
  //       toast.error(res.data.message);
  //       auth.logout();
  //       navigate("/", { replace: true });
  //     } else {
  //       toast(res.data.message);
  //       setShowLoading(true);
  //     }
  //   });
  // };

  // const enrolledStudents = (id) => {
  //   navigate("/enrolledstudents", { state: { id: id } });
  // };

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
              {/* <td>
                {!Enrolled.includes(item._id) ? (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      enroll(item._id);
                    }}
                  >
                    Enroll
                  </Button>
                ) : (
                  <Button variant="success" size="sm" disabled={true}>
                    Enrolled
                  </Button>
                )}
              </td> */}
              {/* <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => {
                    enrolledStudents(item._id);
                  }}
                >
                  Enrolled Students
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteCourse(item._id)}
                >
                  Delete
                </Button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <Button
        variant="primary"
        size="sm"
        onClick={() => navigate("/addcourse")}
      >
        Add Course
      </Button> */}
    </div>
  );
}
