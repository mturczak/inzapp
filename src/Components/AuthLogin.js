import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "./Auth.css";

const AuthLogin = (props) => {
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

 

  const mailChangeHandler = (event) => {
    setEnteredMail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const onSubmit = async (data) => {
    const response = await fetch("/reservation/login", {
      method: "POST",
      body: JSON.stringify({ email: enteredMail, password: enteredPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (json.error) {
      alert(json.error);
    } else {
      console.log("logged in", json);
      alert("logged in");
      sessionStorage.setItem("accessToken", json.token);
      sessionStorage.setItem("id_clients", json.id_clients);
      sessionStorage.setItem("role", json.role);
      setAuthState({
        accessToken: json.token,
        id_clients: json.id_clients,
        role: json.role,
        name: json.name
      });
      
    }
  };

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Logowanie</h3>
            <div className="text-center">
              Nie masz jeszcze konta?{" "}
              <Link to="/AuthRegister">
                <span className="link-primary" role="button">
                  Załóż konto
                </span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Adres Email</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Wprowadź email"
                onChange={mailChangeHandler}
              />
            </div>
            <div className="form-group mt-3">
              <label>Hasło</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Wprowadź hasło"
                onChange={passwordChangeHandler}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                onClick={onSubmit}
                className="btn btn-secondary"
              >
                Potwierdź
              </button>
            </div>
            {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthLogin;
