import React from "react";
import "./ReservationForm.css"

const ReservationForm = () => {
  return (
    <form className="formclass" >
        <div className="new-reservation__controls">
      
      <div className="new_reservation__control">
        <label>Stolik</label>
        <input type="text" />
      </div>
      <div className="new_reservation__control">
        <label>Ilość osób</label>
        <input type="number" />
      </div>
      <div className="new_reservation__control">
        <label>Data</label>
        <input type="date" />
      </div>
      <div className="new_reservation__control">
        <label>Godzina</label>
        <input type="time" />
      </div>
      </div>
      <div className="new-reservation__actions">
        <button type="button">Anuluj</button>
        <button type="submit">Zarezerwuj</button>
      </div>
    </form>
  );
};

export default ReservationForm;