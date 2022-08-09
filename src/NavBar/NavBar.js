import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "./NavBar.css";

const NavBar = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const sessionStorageClear = () => {
    sessionStorage.clear();
    setAuthState({});
  };
  useEffect(() => {
    
  }, [authState]);
  return (
    <div className="navbar justify-content-end">
      <span class="material-symbols-outlined">lunch_dining</span>
      <Link to="/home">Start</Link>
      <Link to="/reservations_preview">Rezerwacje</Link>
      {!authState["accessToken"] ? (
        <Link to="/authlogin">Zaloguj</Link>
      ) : (
        <Link to="/authlogin" onClick={sessionStorageClear}>
          Wyloguj
        </Link>
      )}
    </div>
  );
};

export default NavBar;
