import React from "react";
import { useAuthToken, useAuthUserToken } from "./config/auth";
import { gql, useQuery } from "@apollo/client";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const userQueryGQL = gql`
  query student($studentId: String!) {
    student(studentId: $studentId) {
      _id
      studentNumber
      firstName
      lastName
    }
  }
`;

export const AuthGate = (props) => {
  const [authToken] = useAuthToken();
  const [authUserToken] = useAuthUserToken();

  const { loading, error, data } = useQuery(userQueryGQL, {
    variables: { studentId: authUserToken },
    onCompleted: () => {
      console.log("query successful", data.student.studentNumber);
    },
  });

  if (data) {
    console.log("username output " + data.student.studentNumber);
  }

  if (data && authToken) {
    return props.children;
  }

  if (props.myProp) return <Register loading={loading} />;
  return <Login loading={loading} />;
};
