import React from "react";
import "./NameInput.css"

const NameInput = (props) => {
    const nameChangeHandler = (event) => {
        props.setEnteredName(event.target.value);
      };
      const phoneChangeHandler = (event) => {
        props.setEnteredPhone(event.target.value);
      };
      const mailChangeHandler = (event) => {
        props.setEnteredMail(event.target.value);
      };
    return (
        <>
            <label>Wprowadz imię i nazwisko</label>
            <input type="text" value={props.enteredName} onChange={nameChangeHandler}/>
            <label>Wprowadz numer telefonu</label>
            <input type="tel"
            pattern="[0-9]{9}"
            value={props.enteredPhone}
            onChange={phoneChangeHandler}/>
            <label>Wprowadz email</label>
            <input type="email" value={props.enteredMail} onChange={mailChangeHandler}/>
            <button className="button">Potwierdź</button>
        </>
    )
}

export default NameInput;