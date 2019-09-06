import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div>
      <div className="container-fluid Landing d-flex flex-column justify-content-center align-items-center text-center">
        <h1>Gifoetry!</h1>
        <p>Gifs + Thoughts. More Expressive. More Relatable.</p>
        <Link className="btn btn-outline-light">Explore</Link>
      </div>
    </div>
  );
};

export default Landing;
