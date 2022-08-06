import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

const AuthRegister = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };
  const mailChangeHandler = (event) => {
    setEnteredMail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const onSubmit = async (event ) => {
    event.preventDefault();
    const response = await fetch("/reservation/createuser", {
      method: "POST",
      body: JSON.stringify({ email: enteredMail, name:enteredName, phone:enteredPhone, password: enteredPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);

      // setError(json.error);
      // setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      // setTitle("");
      // setLoad("");
      // setReps("");
      // setError(null);
      // setEmptyFields([]);
      console.log("registered in", json);
      // dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  let returnfalse = async (event) => {
    if (1) {
      event.preventDefault();

      
      document.getElementById("AuthRegisterForm").submit();
    } else {
      console.log("submit");
    }
  };

  return (
    <>
      <div className="Auth-form-container">
        <form
          id={"AuthRegisterForm"}
          className="Auth-form"
          onSubmit={onSubmit}
        >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Already registered?{" "}
              <Link to="/AuthLogin">
                <span className="link-primary" role="button">
                  Sign In
                </span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                onChange={nameChangeHandler}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Email Address"
                onChange={mailChangeHandler}
              />
            </div>
            <div className="form-group mt-3">
              <label>Phone</label>
              <input
                type="phone"
                className="form-control mt-1"
                placeholder="Phone Number"
                onChange={phoneChangeHandler}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                onChange={passwordChangeHandler}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button onClick={onSubmit} className="btn btn-primary">
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

export default AuthRegister;
