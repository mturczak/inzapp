import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import "./NameInput.css";

const NameInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  let elo = "";

  useEffect(() => {
    console.log("idClientState", props.idClientState);
  }, [props.idClientState]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).max(30),
    phone: Yup.string()
      .required()
      .matches(phoneRegExp, "wprowadz poprawny numer telefonu"),
    email: Yup.string().email().required(),
  });

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
  };
  const mailChangeHandler = (event) => {
    setEnteredMail(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredName === "" || enteredPhone === "" || enteredMail === "")
      return console.log("nie dozwolone jest pozostawienie pustych pól");
    const nameInputData = {
      name: enteredName,
      phone: enteredPhone,
      email: enteredMail,
    };

    addNameInputHandler(nameInputData);
    setEnteredName("");
    setEnteredPhone("");
    setEnteredMail("");
  };

  const addNameInputHandler = async (nameInput) => {
    const response = await fetch("/reservation/clients", {
      method: "POST",
      body: JSON.stringify(nameInput),
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
      console.log("new client added id:", json.client_res.id_clients);
      if (json) {
        props.setIdClientState(json.client_res.id_clients);
        //  console.log("idClientState",idClientState);wa
      }
      // dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
    let elo = "";
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
        }}
        // validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form>
          <div className="new-reservation__controls">
            <div className="new-reservation__control">
              <label>Imię i Nazwisko</label>
              <ErrorMessage
                name="name"
                component="div"
                className="alert alert-warning"
              />
              <Field
                id="name"
                name="name"
                placeholder="Jan kowalski"
                value={enteredName}
                onChange={nameChangeHandler}
              />
            </div>
            <div className="new-reservation__control">
              <label> Numer telefonu</label>
              <ErrorMessage
                name="phone"
                component="div"
                className="alert alert-warning"
              />
              <Field
                id="phone"
                name="phone"
                placeholder="123456789"
                value={enteredPhone}
                onChange={phoneChangeHandler}
              />
            </div>
            <div className="new-reservation__control">
              <label htmlFor="email">Email</label>
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-warning"
              />
              <Field
                id="email"
                name="email"
                placeholder="jane@acme.com"
                type="email"
                value={enteredMail}
                onChange={mailChangeHandler}
              />
            </div>
          </div>
          <div className="new-reservation__actions">
            <button type="button" className="button" onClick={submitHandler}>
              Potwierdź
            </button>
          </div>
        </Form>
      </Formik>
      <form>
        <div className="new-reservation__controls">
          <div className="new-reservation__control">
            <label>Wprowadz imię i nazwisko</label>
            <input
              type="text"
              value={enteredName}
              onChange={nameChangeHandler}
            />
          </div>
          <div className="new-reservation__control">
            <label>Wprowadz numer telefonu</label>
            <input
              type="tel"
              pattern="[0-9]{9}"
              value={enteredPhone}
              onChange={phoneChangeHandler}
            />
          </div>
          <div className="new-reservation__control">
            <label>Wprowadz email</label>
            <input
              type="email"
              value={enteredMail}
              onChange={mailChangeHandler}
            />
          </div>
        </div>
        <div className="new-reservation__actions">
          <button type="button" className="button" onClick={submitHandler}>
            Potwierdź
          </button>
        </div>
      </form>
    </div>
  );
};

export default NameInput;
