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
import { AuthGate } from "./AuthGate";
import { ApolloProvider } from "@apollo/react-hooks";
import { useAppApolloClient } from "./config/apolloClient";

function App() {
  const apolloClient = useAppApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <AuthGate>
                <Home />
              </AuthGate>
            }
          ></Route>
          <Route
            exact
            path="/allstudents"
            element={
              <AuthGate>
                <AllStudents />
              </AuthGate>
            }
          ></Route>
          <Route
            exact
            path="/enrolled"
            element={
              <AuthGate>
                <EnrolledCourses />
              </AuthGate>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
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
