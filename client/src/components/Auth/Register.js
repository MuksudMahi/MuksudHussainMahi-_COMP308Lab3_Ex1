import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

toast.configure();

export const registerMutationGQL = gql`
  mutation createStudent(
    $studentNumber: String!
    $firstName: String!
    $lastName: String!
    $address: String
    $city: String
    $phoneNumber: String
    $program: String!
    $email: String!
    $password: String!
  ) {
    createStudent(
      studentNumber: $studentNumber
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      phoneNumber: $phoneNumber
      program: $program
      email: $email
      password: $password
    ) {
      message
    }
  }
`;

export default function Register(props) {
  const [studentNumber, setStudentNumber] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [program, setProgram] = useState();
  const navigate = useNavigate();

  const [mutation, mutationResults] = useMutation(registerMutationGQL, {
    onCompleted: (data) => {
      navigate("/");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation({
      variables: {
        studentNumber: studentNumber,
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        phoneNumber: phoneNumber,
        program: program,
        email: email,
        password: password,
      },
    });
  };
  return (
    <div className="Register">
      <Form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <br></br>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              onChange={(event) => setFirstName(event.target.value)}
              required={true}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              onChange={(event) => setLastName(event.target.value)}
              required={true}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" size="lg" controlId="formStudenrNumber">
          <Form.Label>Program</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Program Name"
            onChange={(event) => setProgram(event.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group className="mb-3" size="lg" controlId="formStudenrNumber">
          <Form.Label>Student Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Student Number"
            onChange={(event) => setStudentNumber(event.target.value)}
            pattern="[0-9]{9}"
            required={true}
          />
        </Form.Group>
        <Form.Group className="mb-3" size="lg" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(event) => setEmail(event.target.value)}
            required={true}
          />
        </Form.Group>
        <Form.Group className="mb-3" size="lg" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required={true}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              onChange={(event) => setAddress(event.target.value)}
              required={true}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formLastName">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              onChange={(event) => setCity(event.target.value)}
              required={true}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" size="lg" controlId="formStudenrNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Phone Number"
            onChange={(event) => setPhoneNumber(event.target.value)}
            required={true}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        <br></br>
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </Form>
    </div>
  );
}
