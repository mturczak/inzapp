import React from "react";
import "./Reservation.css";

const Reservation = (props) => {
  return (
    <li>
      <div className="single_reservation">
        <div className="single_reservation_info">
          {" "}
          Id rezerwacji: {props.reservation_id}
        </div>
        <div className="single_reservation_info">Ilość osób: {props.size}</div>
        <div className="single_reservation_info">
          {" "}
          Stolik nr: {props.table_id}{" "}
        </div>
        <div className="single_reservation_info">
          {" "}
          Data: {props.reservation_date}
        </div>
        <div className="single_reservation_info">
          {" "}
          Godzina: {props.reservation_time}
        </div>
      </div>
    </li>
  );
};

export default Reservation;
