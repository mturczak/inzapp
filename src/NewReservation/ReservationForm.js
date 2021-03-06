import React, { useState } from "react";
import "./ReservationForm.css";

import TablesInSelect from "./TablesInSelect";

let now = new Date();
let todaysDate = (
  now.getFullYear() +
  "-" +
  ("0" + (now.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + now.getDate()).slice(-2)
).toString();

let maxReservationDate = new Date(now.setMonth(now.getMonth() + 1))
  .toISOString()
  .slice(0, 10);

const ReservationForm = (props) => {
  const [enteredSize, setEnteredSize] = useState("");
  const [enteredTable, setEnteredTable] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");
  const [sizeMatchedTables, setSizeMatchedTables] = useState([]);

  let ids_reservations = props.records.map((value) => value.id);
  let max_id_reservations = Math.max(...ids_reservations);

  const sizeChangeHandler = (event) => {
    setEnteredSize(event.target.value);
    matchingSizeTablesHandler(event.target.value);
  };
  const matchingSizeTablesHandler = (size) => {
    const newArray = props.tables.reduce((newTables, tables) => {
      if (tables.table_size >= size) {
        var newValue = tables;
        newTables.push(newValue);
      }
      if (size === "") newTables = [];
      return newTables;
    }, []);
    setSizeMatchedTables(newArray);
  };

  const tableChangeHandler = (event) => {
    setEnteredTable(event.target.value);
    console.log(enteredTable);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };
  const timeChangeHandler = (event) => {
    setEnteredTime(event.target.value);
  };
  const test_button = () => {
    // console.log(enteredSize);
    // console.log(enteredTable);
    // console.log(enteredDate);
    // console.log(enteredTime);
    console.log(props.records);
    console.log(maxReservationDate);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      enteredSize === "" ||
      enteredTable === "" ||
      enteredDate === "" ||
      enteredTime === ""
    )
      return console.log("nie dozwolone jest pozostawienie pustych p??l");
    const reservationData = {
      id: ++max_id_reservations,
      size: enteredSize,
      table_id: enteredTable,
      reservation_date: enteredDate,
      reservation_time: enteredTime,
    };

    props.onSaveReservation(reservationData);
    setEnteredTable("");
    setEnteredSize("");
    setEnteredTime("");
    setEnteredDate("");
  };
  let testOption = sizeMatchedTables.map((option, index) => {
    return (
      <option key={index} value={option.id}>
        {option.id}
      </option>
    );
  });

  return (
    <form className="formclass" onSubmit={submitHandler}>
      <div className="new-reservation__controls">
        <div className="new-reservation__control">
          <label>Ilo???? os??b</label>
          <input
            type="number"
            min={1}
            max={10}
            value={enteredSize}
            onChange={sizeChangeHandler}
          />
        </div>
        <div className="new-reservation__control">
          <label>Stolik</label>
          {/* <Select
            className="new-reservation__control_select"
            value={enteredTable}
            onChange={tableChangeHandler}
            options={props.tables.filter((table) => table.isBusy)}
            getOptionLabel={(option) => option.id}
          /> */}
          <select
            className="new-reservation__control"
            value={enteredTable}
            onChange={tableChangeHandler}
          >
            <TablesInSelect passedOptions={sizeMatchedTables} />
          </select>
        </div>

        <div className="new-reservation__control">
          <label>Data</label>

          <input
            type="date"
            min={todaysDate}
            max={maxReservationDate}
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
        <div className="new-reservation__control">
          <label>Godzina</label>
          <input type="time" value={enteredTime} onChange={timeChangeHandler} />
        </div>
      </div>
      <div className="new-reservation__actions">
        <button className="button" type="submit" onClick={test_button}>
          Zarezerwuj
        </button>
        <button className="button" onClick={test_button} type="button">
          Anuluj
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
