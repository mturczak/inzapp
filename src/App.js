import React from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import ReservationForm from "./Components/ReservationForm";
import ReservationPreview from "./Components/ReservationPreviev";
import { useState, useEffect } from "react";
import NameInput from "./Components/NameInput";

let newday = [];

const App = (props) => {
  const [reservations, setReservations] = useState([]);
  const [example_tables_2, setExampleTables2] = useState([]);
  const [allReservations, setAllReservations] = useState(null);
  const [newdayWithoutReservations, setNewdayWithoudReservations] = useState(
    {}
  );
  const [dateToArray, setDateToArray] = useState(
    new Date().toISOString().slice(0, 10)
  );

  useEffect(() => {
    const fetchTables = async () => {
      const response = await fetch("/reservation/tables");
      const json = await response.json();

      if (response.ok) {
        setExampleTables2(json);
      }
    };
    console.log(dateToArray);
    creatingNewDay();

    fetchTables();
  }, [dateToArray]);

  // creating new array of objects, every table in array have to parameters : array with free hours and size
  const creatingNewDay = async () => {
    let temp = [];

    let response1 = await fetch("/reservation/tables");
    const json_tables = await response1.json();

    if (response1.ok) {
      let response2 = await fetch("/reservation/hours");
      const json_hours = await response2.json();

      if (response2.ok) {
        json_tables.forEach((e) => {
          temp.push(e.id_tables);
        });

        let allHoursArray = [];

        json_hours.forEach((i) => allHoursArray.push(i.name.toString()));

        for (let i = 0; i < Object.keys(json_tables).length; i++) {
          newday[i] = {
            ...json_tables[i],
            freeHours: Array.from(allHoursArray),
          };
        }

        createNewDayWithoutReservations(dateToArray.toString(), newday);
      }
    }
  };

  // creating actual free hours for every table in the day
  const createNewDayWithoutReservations = async (date, object) => {
    let tempNewdayWithoutReservations = Array.from(object);
    let response = await fetch(
      "/reservation/reservedbydate/" + encodeURIComponent(date)
    );
    const json = await response.json();

    if (response.ok) {
      await json.reservations.forEach((e, index) => {
        for (
          let i = 0;
          i < tempNewdayWithoutReservations[e.id_tables].freeHours.length;
          i++
        ) {
          if (
            tempNewdayWithoutReservations[e.id_tables].freeHours[i] === e.time
          ) {
            for (let j = 0; j < 3; j++)
              tempNewdayWithoutReservations[e.id_tables].freeHours[i - 1 + j] =
                "busy";
            // console.log(tempNewdayWithoutReservations[e.id_tables]);
          }
        }
      });
      // console.log("newdayWithoutReservations", tempNewdayWithoutReservations);
      setNewdayWithoudReservations(tempNewdayWithoutReservations);
    }
  };

  // const addReservationHandler2 = (reservation) => {
  //   setReservations((prevReservations) => {
  //     console.log([...prevReservations, reservation]);
  //     return [...prevReservations, reservation];
  //   });
  // };

  const addReservationHandler = async (reservation) => {
    const response = await fetch("/reservation", {
      method: "POST",
      body: JSON.stringify(reservation),
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

  const onSaveReservationDataHandler = (enterReservationData) => {
    const reservationData = {
      ...enterReservationData,
      id: Math.random().toString(),
    };

    // props.onAddReservation(reservationData);
  };

  return (
    <div className="App">
      <header className="App-header">inzapp</header>
      <NavBar />
      <ReservationForm
        records={reservations}
        setDateToArray={setDateToArray}
        tables={example_tables_2}
        tables2={newdayWithoutReservations}
        onSaveReservationData={onSaveReservationDataHandler}
        onSaveReservation={addReservationHandler}
      />
      <ReservationPreview
        records={reservations}
        allReservations={allReservations}
        setAllReservations={setAllReservations}
      />
    </div>
  );
};

export default App;
