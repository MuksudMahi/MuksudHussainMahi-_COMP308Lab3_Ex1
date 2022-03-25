import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import React from "react";
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
            path="/register"
            element={<AuthGate myProp={Register}></AuthGate>}
          ></Route>
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
            path="/allcourses"
            element={
              <AuthGate>
                <AllCourses />
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
          <Route
            exact
            path="/addcourse"
            element={
              <AuthGate>
                <AddCourse />
              </AuthGate>
            }
          ></Route>
          <Route
            exact
            path="/enrolledstudents"
            element={
              <AuthGate>
                <EnrolledStudents />
              </AuthGate>
            }
          ></Route>
          <Route
            exact
            path="/edit"
            element={
              <AuthGate>
                <EditSection />
              </AuthGate>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
export default App;
