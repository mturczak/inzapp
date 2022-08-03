import React, { useEffect, useState } from "react";
import "./NameInput.css";

const NameInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredMail, setEnteredMail] = useState("");

  useEffect(() => {
    console.log("idClientState", props.idClientState);
  }, [props.idClientState]);

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
    console.log("id_clients", json.data[0]);

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
      console.log("new client added", json);
      if (json) {
        props.setIdClientState(json.data[0].id_clients);
        //  console.log("idClientState",idClientState);wa
      }
      // dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    <form>
      <div className="new-reservation__controls">
        <div className="new-reservation__control">
          <label>Wprowadz imię i nazwisko</label>
          <input type="text" value={enteredName} onChange={nameChangeHandler} />
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
          <input type="text" value={enteredMail} onChange={mailChangeHandler} />
        </div>
      </div>
      <div className="new-reservation__actions">
        <button type="button" className="button" onClick={submitHandler}>
          Potwierdź
        </button>
      </div>
    </form>
  );
};

export default NameInput;
