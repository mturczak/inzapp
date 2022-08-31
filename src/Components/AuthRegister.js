import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const AuthRegister = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    criteriaMode: "all",
  });

  const messagesFunction = ({ messages }) => {
    console.log("messages", messages);
    return messages
      ? Object.entries(messages).map(([type, message]) => (
          <span className="error" key={type}>
            {message}
          </span>
        ))
      : null;
  };

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

  const onSubmit = async (data) => {
    // event.preventDefault();
    const response = await fetch("/reservation/createuser", {
      method: "POST",
      body: JSON.stringify({
        email: data.enteredMail,
        name: data.enteredName,
        phone: data.enteredPhone,
        password: data.enteredPassword,
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

      reset();

      navigate("/authlogin");
    }
  };

  return (
    <>
      <div className="Auth-form-container">
        <form
          id={"AuthRegisterForm"}
          className="Auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                // onChange={nameChangeHandler}
                {...register("enteredName", {
                  required: {
                    value: true,
                    message: "Wprowadź imię i nazwisko",
                  },
                  minLength: {
                    value: 4,
                    message: "Wprowadź conajmniej 4 znaki",
                  },
                  maxLength: {
                    value: 50,
                    message: "Wprowadź krótsze imię o nazwisko",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="enteredName"
                render={messagesFunction}
              />
            </div>
            <div className="form-group mt-3">
              <label>Adres email</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="adres email"
                // onChange={mailChangeHandler}
                {...register("enteredMail", {
                  required: {
                    value: true,
                    message: "Wprowadź adres email",
                  },
                  minLength: {
                    value: 4,
                    message: "Wprowadź conajmniej 4 znaki",
                  },
                  maxLength: {
                    value: 50,
                    message: "Wprowadź krótszy adres email",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="enteredMail"
                render={messagesFunction}
              />
            </div>
            <div className="form-group mt-3">
              <label>Telefon</label>
              <input
                type="phone"
                className="form-control mt-1"
                placeholder="numer telefonu"
                // onChange={phoneChangeHandler}
                {...register("enteredPhone", {
                  required: {
                    value: true,
                    message: "Wprowadź numer telefonu",
                  },
                  pattern: {
                    value: /^\+?[1-9][0-9]{7,14}$/,
                    message: "Wprowadź poprawny numer telefonu.",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="enteredPhone"
                render={messagesFunction}
              />
            </div>
            <div className="form-group mt-3">
              <label>Hasło</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="hasło"
                // onChange={passwordChangeHandler}
                {...register("enteredPassword", {
                  required: {
                    value: true,
                    message: "Wprowadź hasło",
                  },
                  minLength: {
                    value: 4,
                    message: "Wprowadź conajmniej 4 znaki",
                  },
                  maxLength: {
                    value: 50,
                    message: "Wprowadź krótsze hasło",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="enteredPassword"
                render={messagesFunction}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={handleSubmit(onSubmit)}
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

export default AuthRegister;
