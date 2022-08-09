import React, { useEffect, useState } from "react";
import "./Home.css";
import ReservationForm from "./Components/ReservationForm";

let newday = [];

const Home = (props) => {
  const [example_tables_2, setExampleTables2] = useState([]);

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

  // creating new array of objects, every table in array have parameters : array with free hours and size and location
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

  const addReservationHandler = async (reservation) => {
    const response = await fetch("/reservation", {
      method: "POST",
      body: JSON.stringify(reservation),
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    });

    const json = await response.json();
    // console.log("new reservation added", json);
    if (json.error) {
      console.log(json.error);

      // setError(json.error);
      // setEmptyFields(json.emptyFields);
    }else {
      console.log("new reservation added", json);
    }
    
  };

  return (
    <div className="App">
      <ReservationForm
        setDateToArray={setDateToArray}
        tables={example_tables_2}
        tables2={newdayWithoutReservations}
        onSaveReservation={addReservationHandler}
      />
    </div>
  );
};

export default Home;