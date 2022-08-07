import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css"

const AuthLogin = (props) => {
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

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
      
    }else {
      console.log("logged in", json);
      alert("logged in")
      sessionStorage.setItem("accesToken",json.token)
      sessionStorage.setItem("id_client",json.id)
      sessionStorage.setItem("role", json.role)
    }
  };

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <Link to="/AuthRegister">
                <span className="link-primary" role="button">
                  Sign Up
                </span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={mailChangeHandler}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={passwordChangeHandler}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                onClick={onSubmit}
                className="btn btn-secondary"
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthLogin;
