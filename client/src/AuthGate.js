import React from "react";
import { useAuthToken, useAuthUserToken } from "./config/auth";
import { gql, useQuery } from "@apollo/client";
import Login from "./components/Auth/Login";
import Home from "./components/Home/Home";

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
    //return <Home user={data.student.studentNumber} />;
  } else {
    return <Login loading={loading} />;
  }
};
