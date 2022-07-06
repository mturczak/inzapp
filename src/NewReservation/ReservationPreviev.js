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
            size={records.size}
            reservation_id={records.id}
            table_id={records.table_id}
            reservation_date={records.reservation_date}
            reservation_time={records.reservation_time}
          />
        ))}
      </ul>
    </div>
  );
};

export default ReservationPreview;
