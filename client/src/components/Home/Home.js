import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import NavBar from "../Nav/Nav";
import auth from "../Auth/Auth";
import "./Home.css";

export default function Home(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated) return navigate("/");
  });

  return (
    <div>
      <NavBar />
      <h1 className="Home">Welcome to course registration website</h1>
    </div>
  );
}
