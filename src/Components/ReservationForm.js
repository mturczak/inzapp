import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../helpers/AuthContext";
import NameInput from "./NameInput";
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
  const [enteredDate, setEnteredDate] = useState(todaysDate);
  const [enteredTime, setEnteredTime] = useState("");
  const [idClientState, setIdClientState] = useState("");

  const [enteredLocation, setEnteredLocation] = useState("każde");
  const [sizeMatchedTables, setSizeMatchedTables] = useState([]);
  const [hours, setHours] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const fetchHours = async () => {
      const response = await fetch("/reservation/hours");
      // console.log(response);
      const json = await response.json();
      // console.log(json);
      if (response.ok) {
        setHours(json);
      }
    };
    // console.log(enteredDate);
    if (sessionStorage.getItem("id_client")) {
      setIdClientState(sessionStorage.getItem("id_client"));
    }
    console.log({ authState });
    fetchHours();
  }, [authState, enteredSize, sizeMatchedTables, enteredTable, enteredTime]);

  const sizeChangeHandler = (event) => {
    setEnteredSize(event.target.value);
    // console.log(props.tables);
    matchingSizeTablesHandler(event.target.value);
  };
  const matchingSizeTablesHandler = async (temp_size) => {
    const newArray = props.tables2.filter((x) => x.size >= temp_size);

    setSizeMatchedTables(newArray);
    console.log({ newArray });
    newArray[0]
      ? setEnteredTable(newArray[0].id_tables.toString())
      : setEnteredTable("");
    console.log(newArray[0]);
    if (newArray[0] && newArray[0].freeHours) {
      for (let i = 0; i < newArray[0].freeHours.length; i++) {
        if (newArray[0].freeHours[i] !== "busy") {
          setEnteredTime(i);
          break;
        }
      }
    }

    // setEnteredTime(newArray[0].freeHours[0]);
  };

  const tableChangeHandler = (event) => {
    setEnteredTable(event.target.value);

    console.log(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    props.setDateToArray(event.target.value);
  };
  const timeChangeHandler = (event) => {
    setEnteredTime(event.target.value);
    console.log(event.target.value);
  };
  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };
  const test_button = () => {
    console.table({ enteredSize, enteredDate, enteredTable, enteredTime });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (idClientState === "" && !sessionStorage.getItem("accessToken"))
      return alert("wprowadz klienta");
    if (
      enteredSize === "" ||
      enteredTable === "" ||
      enteredDate === "" ||
      enteredTime === ""
    )
      return alert("nie dozwolone jest pozostawienie pustych pól");

    const reservationData = {
      // id: ++max_id_reservations,
      // size: enteredSize,
      id_clients: idClientState,
      id_tables: enteredTable,
      date: enteredDate,
      id_hours: enteredTime,
    };

    await props.onSaveReservation(reservationData);
    setEnteredTable("");
    setEnteredSize("");
    setEnteredTime("");
    setEnteredDate("");
    // setEnteredLocation("każde");

    document.location.reload();
  };
  // let testOption = sizeMatchedTables.map((option, index) => {
  //   return (
  //     <option key={index} value={option.id}>
  //       {option.id}
  //     </option>
  //   );
  // });
  // console.log(props.tables2);

  if (props.tables2 && props.tables2[0] && props.tables2[0].freeHours) {
    // console.log(props.tables2[2].freeHours);
  }

  // console.log(props.tables);
  return (
    <>
      {(!authState["role"] || authState["role"] === "admin") && (
        <NameInput
          idClientState={idClientState}
          setIdClientState={setIdClientState}
        />
      )}
      <form className="formclass" onSubmit={submitHandler}>
        <div className="new-reservation__controls">
          <div className="new-reservation__control">
            {/* <NameInput enteredName={enteredName} enteredPhone={enteredPhone} enteredMail={enteredMail}
                setEnteredName={setEnteredName} setEnteredPhone={setEnteredPhone} setEnteredMail={setEnteredMail}      /> */}
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
            <label>Ilość osób</label>
            <input
              type="number"
              min={1}
              max={9}
              value={enteredSize}
              onChange={sizeChangeHandler}
            />
          </div>
          {/* <div className="new-reservation__control">
          <label>Położenie stolika</label>
          <select
            className="new-reservation__control"
            value={enteredLocation}
            onChange={locationChangeHandler}
          >
            {props.tables2 &&
              props.tables2[0] &&
              props.tables2[0].location &&
              props.tables2.map((tables, index) => {
                
                  return (
                    <option key={index} value={index}>
                      {tables.location}
                    </option>
                  );
              })}
          </select>
          
        </div> */}
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
            <label>Godzina</label>
            <select
              className="new-reservation__control"
              value={enteredTime}
              onChange={timeChangeHandler}
            >
              {/* {hours &&
              hours.map((hour) => {
                return (
                  <option key={hour.id_hours} value={hour.id_hours}>
                    {hour.name}
                  </option>
                );
              })} */}
              {
                // props.tables2 &&
                //   props.tables2[0] &&
                //   props.tables2[0].freeHours &&

                enteredTable &&
                  props.tables2[enteredTable].freeHours.map((hour, index) => {
                    if (hour != "busy") {
                      return (
                        <option key={index + "r"} value={index}>
                          {hour}
                        </option>
                      );
                    }
                    return null;
                  })
              }
            </select>
            {/* <input type="time" value={enteredTime} onChange={timeChangeHandler} />s */}
          </div>
        </div>
        <div className="new-reservation__actions">
          <button className="button" type="submit" onClick={submitHandler}>
            Zarezerwuj
          </button>
          <button className="button" onClick={test_button} type="button">
            Anuluj
          </button>
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
