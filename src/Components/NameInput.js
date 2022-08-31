import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext";
import "./NameInput.css";

const NameInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    console.log("idClientState", props.idClientState);
  }, [props.idClientState]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3, "za krótkie").max(30, "za długie"),
    phone: Yup.string()
      .required("wprowadź numer telefonu")
      .matches(phoneRegExp, "wprowadz poprawny numer telefonu"),
    // email: Yup.string().email().required("wprowadź email"),
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

  const submitHandler = (name, phone) => {
    // if (
    //   enteredName === "" ||
    //   enteredPhone === "" ||
    //   (enteredMail === "" && authState.accessToken)
    // )
    //   return console.log("nie dozwolone jest pozostawienie pustych pól");
    const nameInputData = {
      name: name,
      phone: phone,
      email: authState.accessToken ? enteredMail : null,
    };
    // const nameInputData = {
    //   name: enteredName,
    //   phone: enteredPhone,
    //   email: authState.accessToken ? enteredMail : null,
    // };

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
        console.log("idClientState", props.idClientState);
      }
      // dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          // email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log({ values });

          submitHandler(values.name, values.phone);
        }}
      >
        {(formik) => (
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
                  disabled={props.idClientState}
                  // value={enteredName}
                  // onChange={nameChangeHandler}
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
                  disabled={props.idClientState}

                  // value={enteredPhone}
                  // onChange={phoneChangeHandler}
                />
              </div>

              {/* {authState.accessToken && (
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
                    placeholder="jan@gmail.com"
                    type="email"
                    value={enteredMail}
                    onChange={mailChangeHandler}
                  />
                </div>
              )} */}
            </div>
            <div className="new-reservation__actions">
              <button
                type="submit"
                className="button"
                disabled={
                  !(formik.isValid && formik.dirty && !props.idClientState)
                }
                // onClick={submitHandler}
                // onClick={formik.handleSubmit}
              >
                Potwierdź
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* <form>
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
      </form> */}
    </div>
  );
};

export default NameInput;
