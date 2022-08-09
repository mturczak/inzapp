import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthRegister = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  let navigate = useNavigate();
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

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/reservation/createuser", {
      method: "POST",
      body: JSON.stringify({
        email: enteredMail,
        name: enteredName,
        phone: enteredPhone,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      window.alert(json.error);
    }
    if (response.ok) {
      console.log("registered in", json);
      window.alert("Konto zarejestrowane pomyślnie.");

      navigate("/authlogin");
    }
  };

  return (
    <>
      <div className="Auth-form-container">
        <form id={"AuthRegisterForm"} className="Auth-form" onSubmit={onSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Rejestracja</h3>
            <div className="text-center">
              Masz już konto?{" "}
              <Link to="/AuthLogin">
                <span className="link-primary" role="button">
                  Zaloguj się
                </span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Imię i nazwisko</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="np. Jan Kowalski"
                onChange={nameChangeHandler}
              />
            </div>
            <div className="form-group mt-3">
              <label>Adres email</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="adres email"
                onChange={mailChangeHandler}
              />
            </div>
            <div className="form-group mt-3">
              <label>Telefon</label>
              <input
                type="phone"
                className="form-control mt-1"
                placeholder="numer telefonu"
                onChange={phoneChangeHandler}
              />
            </div>
            <div className="form-group mt-3">
              <label>Hasło</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="hasło"
                onChange={passwordChangeHandler}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button onClick={onSubmit} className="btn btn-secondary">
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

export default AuthRegister;
