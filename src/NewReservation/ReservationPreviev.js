import React from "react";
import Reservation from "./Reservation";

const ReservationPreview = (props) => {
  return (
    <div>
      <label>Podgląd Rezerwacji</label>
      <ul>
        {props.records.map((records) => (
          <Reservation
            key={records.id}
            reservation_id={records.id}
            table_id={records.table_id}
            reservation_date={records.reservation_date}
          />
        ))}
      </ul>
    </div>
  );
};

export default ReservationPreview;
