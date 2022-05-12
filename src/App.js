import React from "react";
import "./App.css";
import ReservationForm from "./NewReservation/ReservationForm";



const example_tables = [
  {id: 1, table_size: 1, isBusy:false},
  {id: 2, table_size: 2, isBusy:true},
  {id: 3, table_size: 2, isBusy:false},
  {id: 4, table_size: 3, isBusy:true},
  {id: 5, table_size: 3, isBusy:true},
  {id: 6, table_size: 4, isBusy:true}



]

const App = () => {
  return (
    <div className="App">
      <header className="App-header">inzapp</header>
      <ReservationForm tables={example_tables} />
    </ div>
  );
};

export default App;
