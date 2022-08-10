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
  useEffect(() => {}, [authState]);
  return (
    <div className="navbar">
      <Link className="left_assigned" to="/home">
        <span class="material-symbols-outlined">lunch_dining</span>
      </Link>
      {authState.name && <p className="witaj">Witaj {authState.name}!</p>}
      <div className="navbar_inside">
        <Link to="/home">Start</Link>

        {!authState["accessToken"] ? (
          <Link to="/authlogin">Zaloguj</Link>
        ) : (
          <>
            <Link to="/reservations_preview">Rezerwacje</Link>
            {authState["role"] === "admin" && (
              <Link to="/clients_preview">Klienci</Link>
            )}
            <Link to="/authlogin" onClick={sessionStorageClear}>
              Wyloguj
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
