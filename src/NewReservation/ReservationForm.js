import React from "react";
import "./ReservationForm.css";
import Select from 'react-select'


let now = new Date();
const todaysDate = now.getFullYear()+'-'+('0' + (now.getMonth()+1)).slice(-2) + '-'+now.getDate();


const ReservationForm = (props) => {
  return (
    <form className="formclass">
      <div className="new-reservation__controls">
        <div className="new-reservation__control">
          <label>Ilość osób</label>
          <input type="number" />
        </div>
        <div className="new-reservation__control">
          <label>Stolik</label>
          <Select className="new-reservation__control_select" options={props.tables.filter(table  => table.isBusy   )} getOptionLabel={(option)=>option.id} />
        </div>

        <div className="new-reservation__control">
          <label>Data</label>

          <input type="date" min={todaysDate} max = "2022-07-15"/>
        </div>
        <div className="new-reservation__control">
          <label>Godzina</label>
          <input type="time" />
        </div>
      </div>
      <div className="new-reservation__actions">
        <button className="button" type="button">
        Zarezerwuj
        </button>
        <button className="button" type="submit">
          Anuluj
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
