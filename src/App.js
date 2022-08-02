import React from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import ReservationForm from "./NewReservation/ReservationForm";
import ReservationPreview from "./NewReservation/ReservationPreviev";
import { useState, useEffect } from "react";

const example_tables = [
  { id: 1, table_size: 1, isBusy: false },
  { id: 2, table_size: 2, isBusy: true },
  { id: 3, table_size: 2, isBusy: false },
  { id: 4, table_size: 3, isBusy: true },
  { id: 5, table_size: 3, isBusy: true },
  { id: 6, table_size: 4, isBusy: true },
];

// const example_reservations = [
//   {
//     id: 1,
//     table_id: 1,
//     size: 1,
//     reservation_date: "2022-08-10",
//     reservation_time: "15:00",
//   },
//   {
//     id: 2,
//     table_id: 2,
//     size: 2,
//     reservation_date: "2022-08-11",
//     reservation_time: "16:00",
//   },
//   {
//     id: 3,
//     table_id: 3,
//     size: 2,
//     reservation_date: "2022-08-12",
//     reservation_time: "17:00",
//   },
// ];
let tablica = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];
let array = {
  table1: [10, 11, 12],
  table: [4, 5, 6],
};

let newday = {};
// let newdayWithoutReservations={};




// {  table1: {freeHours:[10,11,12], "duzo": "1"},
//                     table2: {freeHours:[10,11,12], "duzo": "2"},
//                     table3: {freeHours:[10,11,12], "duzo": "3"}
// }



const App = (props) => {
  const [reservations, setReservations] = useState([]);
  const [example_tables_2, setExampleTables2] = useState([]);
  const [allReservations, setAllReservations] = useState(null);
  const [newdayWithoutReservations, setNewdayWithoudReservations] = useState({});

  useEffect(() => {
    const fetchTables = async () => {
      const response = await fetch("/reservation/tables");
      const json = await response.json();
      // console.log(json);
      if (response.ok) {
        // console.log("ok");
        setExampleTables2(json);
        // console.log(json);
        console.log("example tables 2", json);
      }
    };
    creatingNewDay();
    
    fetchTables();
  }, []);

  // creating new array of objects, every table in array have to parameters : array with free hours and size
const creatingNewDay = async () => {
  let temp = [];
  // let newday = {};

  
  let response1 = await fetch("/reservation/tables");
  const json_tables = await response1.json();
  // console.log(json_tables);
  if (response1.ok) {
    let response2 = await fetch("/reservation/hours");
    const json_hours = await response2.json();
    console.log("json_hours", json_hours)
    
    // console.log(json_hours);
    if (response2.ok) {
      json_tables.forEach((e) => {
        temp.push(e.id_tables);
      });
      console.log("temp", temp);
      let allHoursArray = [];
      
      json_hours.forEach((i) => allHoursArray.push(i.name.toString()));
      console.log("allhours",allHoursArray)

      for (let e = 0; e < temp.length; e++) {
        let elo = await  temp[e].toString();
         newday[elo] = { freeHours: Array.from(allHoursArray), size: json_tables[e].size };
      }
      
      console.log("newday", newday);
      console.log("keys",Object.keys(newday));
      createNewDayWithoutReservations("2022-07-30", newday);
    }
  }
};

// creating actual free hours for every table in the day

  const createNewDayWithoutReservations = async (date, object) => {
    let tempNewdayWithoutReservations = Object.assign({},object);
    let response = await fetch(
      "/reservation/reservedbydate/" + encodeURIComponent(date)
    );
    const json = await response.json();
    
    if (response.ok  ) {
      console.log("nowa funkcja", json);
      console.log(json.reservations)
  
      await json.reservations.forEach((e, index) => {
        for (let i = 0; i<tempNewdayWithoutReservations[e.id_tables].freeHours.length; i++ ){
          if (tempNewdayWithoutReservations[e.id_tables].freeHours[i] === e.time){
            tempNewdayWithoutReservations[e.id_tables].freeHours.splice(i, 2)
            console.log(tempNewdayWithoutReservations[e.id_tables]);
          }
          
        }
        
      });
      console.log("newdayWithoutReservations", tempNewdayWithoutReservations);
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

    props.onAddReservation(reservationData);
  };

  return (
    <div className="App">
      <header className="App-header">inzapp</header>
      <NavBar />
      <ReservationForm
        records={reservations}
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
