import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import axios from "axios";
import React, { useState, useEffect } from "react";
import auth from "./components/Auth/Auth";
import NavBar from "./components/Nav/Nav";
import AddCourse from "./components/Course/Add";
import AllCourses from "./components/Course/All";
import EnrolledCourses from "./components/Course/Enrolled";
import EditSection from "./components/Course/Edit";
import AllStudents from "./components/Student/All";
import EnrolledStudents from "./components/Student/Enrolled";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Authenticated>
                <Login />
              </Authenticated>
            }
          ></Route>
          <Route
            exact
            path="/register"
            element={
              <Authenticated>
                <Register />
              </Authenticated>
            }
          ></Route>
          <Route
            exact
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          ></Route>
          <Route
            exact
            path="/addcourse"
            element={
              <RequireAuth>
                <AddCourse />
              </RequireAuth>
            }
          ></Route>
          <Route
            exact
            path="/allcourses"
            element={
              <RequireAuth>
                <AllCourses />
              </RequireAuth>
            }
          ></Route>
          <Route
            exact
            path="/allstudents"
            element={
              <RequireAuth>
                <AllStudents />
              </RequireAuth>
            }
          ></Route>
          <Route
            exact
            path="/enrolled"
            element={
              <RequireAuth>
                <EnrolledCourses />
              </RequireAuth>
            }
          ></Route>
          <Route
            exact
            path="/enrolledstudents"
            element={
              <RequireAuth>
                <EnrolledStudents />
              </RequireAuth>
            }
          ></Route>
          <Route
            exact
            path="/edit"
            element={
              <RequireAuth>
                <EditSection />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function RequireAuth(props) {
  let location = useLocation();
  if (!auth.isAuthenticated())
    return <Navigate to="/" state={{ from: location }} replace />;
  return props.children;
}

function Authenticated(props) {
  let location = useLocation();
  if (auth.isAuthenticated())
    return <Navigate to="/home" state={{ from: location }} replace />;
  return props.children;
}

function ShowNav() {
  if (auth.isAuthenticated) {
    return <NavBar />;
  }
}

export default App;
