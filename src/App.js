import React from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import ReservationForm from "./NewReservation/ReservationForm";
import ReservationPreview from "./NewReservation/ReservationPreviev";



const example_tables = [
  {id: 1, table_size: 1, isBusy:false},
  {id: 2, table_size: 2, isBusy:true},
  {id: 3, table_size: 2, isBusy:false},
  {id: 4, table_size: 3, isBusy:true},
  {id: 5, table_size: 3, isBusy:true},
  {id: 6, table_size: 4, isBusy:true}
]

const example_reservations = [
  {id: 1, table_id: 1, reservation_date: '2022-07-10T15:00'},
  {id: 2, table_id: 2, reservation_date: '2022-07-11T15:00'},
  {id: 3, table_id: 3, reservation_date: '2022-07-12T15:00'}

]

const App = () => {
  return (
    <div className="App">
      <header className="App-header">inzapp</header>
      <NavBar />
      <ReservationForm tables={example_tables} />
      <ReservationPreview records={example_reservations} />
    </ div>
  );
};

export default App;
