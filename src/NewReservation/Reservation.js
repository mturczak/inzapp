import React from "react";
import "./Reservation.css"

const Reservation = props => {
    
    return (
        <li>
            <div className="single_reservation">
            <div className="single_reservation_info"> Rezerwacja z id: {props.reservation_id}</div>
            <div className="single_reservation_info"> Stolik nr: {props.table_id} </div>
            <div className="single_reservation_info"> Data: {Date(props.reservation_date)}</div>
            </div>
        </li>
    )
}

export default Reservation;
