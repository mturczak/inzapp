import React from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import ReservationForm from "./NewReservation/ReservationForm";
import ReservationPreview from "./NewReservation/ReservationPreviev";
import { useState } from "react";



const example_tables = [
  {id: 1, table_size: 1, isBusy:false},
  {id: 2, table_size: 2, isBusy:true},
  {id: 3, table_size: 2, isBusy:false},
  {id: 4, table_size: 3, isBusy:true},
  {id: 5, table_size: 3, isBusy:true},
  {id: 6, table_size: 4, isBusy:true}
]

const example_reservations = [
  {id: 1, table_id: 1, size:1, reservation_date: '2022-08-10' , reservation_time:'15:00'},
  {id: 2, table_id: 2, size:2, reservation_date: '2022-08-11', reservation_time:'16:00'},
  {id: 3, table_id: 3, size:2, reservation_date: '2022-08-12', reservation_time:'17:00'}

]

const App = (props) => {
  const [reservations, setReservations] = useState (example_reservations);
  const addReservationHandler = (reservation) => {
    setReservations((prevReservations) => {
      console.log([...prevReservations, reservation]);
      return ([...prevReservations, reservation]);
      
    });
  };
  const onSaveReservationDataHandler = (enterReservationData) => {
    const reservationData = {
      ...enterReservationData,
      id:Math.random().toString()
    }
    
    props.onAddReservation(reservationData);
    
  }

 
  return (
    <div className="App">
      <header className="App-header">inzapp</header>
      <NavBar />
      <ReservationForm records={reservations} tables={example_tables} onSaveReservationData ={onSaveReservationDataHandler} onSaveReservation={addReservationHandler} />
      <ReservationPreview records={reservations} />
    </ div>
  );
};

export default App;
