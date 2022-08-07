import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar justify-content-end">
      {/* <nav class="navbar navbar-light "> */}
      <span class="material-symbols-outlined">lunch_dining</span>
      <Link to="/home">
        {" "}
        Start
        {/* <button className="btn btn-secondary mr-1 ">Start</button> */}
      </Link>
      <Link to="/reservations_preview">
        {" "}
        Rezerwacje
        {/* <button className="btn btn-secondary pd-">Rezerwacje</button> */}
      </Link>
      <Link
        to="/authlogin"
        onClick={() => {
          sessionStorage.clear();
        }}
      >
        Wyloguj
        {/* <button className="btn btn-secondary pd-">Wyloguj</button> */}
      </Link>
      {/* </nav> */}

      {/* <div className="btn-group mb-2 btn-group-lg">
    <Link to="/">
        <button className="btn btn-secondary ">Start</button>
      </Link>
      <Link to="/auth">
        <button className="btn btn-secondary pd-">Wyloguj</button>
      </Link>
      </div> */}
    </div>
  );
};

export default NavBar;
