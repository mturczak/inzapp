import React, { useState } from "react";
import "./NameInput.css";

const NameInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const [idClientState, setIdClientState]= useState("");

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
    if (
      enteredName === "" ||
      enteredPhone === "" ||
      enteredMail === ""
      
    )
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
      console.log("new reservation added", json);
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
          <input
            type="text"
            value={enteredMail}
            onChange={mailChangeHandler}
          />

          </div>
          </div>
          <div className="new-reservation__actions">
            <button type="button" className="button" onClick={submitHandler}>Potwierdź</button>
          </div>
        
      
    </form>
  );
};

export default NameInput;
