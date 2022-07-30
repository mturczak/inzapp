import React, { useState, useEffect } from "react";
import Reservation from "./Reservation";

const ReservationPreview = (props) => {
  const [allReservations, setAllReservations] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch("/reservation");
      // console.log(response);
      const json = await response.json();
      // console.log(json);
      if (response.ok) {
        setAllReservations(json);
      }
    };

    fetchReservations();
  }, []);
  return (
    <div>
      <label>Podgląd Rezerwacji</label>
      <ul>
        {allReservations &&
          allReservations.map((reservation) => (
            <p key={reservation.id_reservation}>
              <strong>id: </strong>
              {reservation.id_reservation},<strong>Data:</strong>{" "}
              {reservation.date}, <strong>Utworzono:</strong>{" "}
              {reservation.created_at}
            </p>

            // <Reservation
            //   key={records.id}
            //   size={records.size}
            //   reservation_id={records.id}
            //   table_id={records.table_id}
            //   reservation_date={records.reservation_date}
            //   reservation_time={records.reservation_time}
            // />
          ))}
      </ul>
    </div>
  );
};

export default ReservationPreview;
