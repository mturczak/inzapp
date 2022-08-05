import React, { useState, useEffect } from "react";
import Reservation from "./Reservation";
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import DataTable from 'react-data-table-component';
import moment from "moment";

let data;
moment.locale('pl');
const ReservationPreview = (props) => {
  useEffect(() => {
    const fetchReservations = async () => {
      const response = await fetch("/reservation/info");
      // console.log(response);
      const json = await response.json();
      // console.log(json);
      if (response.ok) {
        props.setAllReservations(json);
      }
    };

    fetchReservations();
    
  }, []);

  const theme = useTheme({
    Row: `
      cursor: pointer;

      .td {
        border-top: 1px solid #a0a8ae;
        border-bottom: 1px solid #a0a8ae;
      }

      &:hover .td {
        border-top: 1px solid orange;
        border-bottom: 1px solid orange;
      }
    `,
  });

  const columns = [{
    name: "ID Rezerwacji",
    selector: row => row.id_reservation,
    sortable: true
  },
  {
    name: "Data Rezerwacji",
    selector: row => row.date,
    format: row => moment(row.date).format('ll'),
    sortable: true
  },
  {
    name: "Godzina",
    selector: row => row.Hour
  },
  {
    name: "Klient",
    selector: row => row.name,
    sortable: true
  },
  {
    name: "phone",
    selector: row => row.phone
  },
  {
    name: "mail",
    selector: row => row.email
  },
  {
    name: "Stolik",
    selector: row => row.TableName
  },
  {
    name: "Lokalizacja",
    selector: row => row.TableLocation
  },
  {
    name: "Utworzono",
    selector: row => row.created_at,
    format: row => moment(row.created_at).locale("pl").format('lll'),
    sortable: true,
  },
  {
    name: "Edytowano",
    selector: row => row.updated_at,
    format: row => moment(row.updated_at).format('lll'),
    
    sortable: true,
  },
    ]
    const columns2 = [{
      label: "ID Rezerwacji",
      renderCell: row => row.id_reservation

    },
    {
      label: "Data Rezerwacji",
      renderCell:row => row.date,
      
    },
    {
      label: "Godzina",
      renderCell: row => row.Hour
    },
    {
      label: "Klient",
      renderCell: row => row.name,
      
    },
    {
      label: "phone",
      renderCell: row => row.phone
    },
    {
      label: "mail",
      renderCell: row => row.email
    },
    {
      label: "Stolik",
      renderCell: row => row.TableName
    },
    {
      label: "Lokalizacja",
      renderCell: row => row.TableLocation
    },
    {
      label: "Utworzono",
      renderCell: row => row.created_at,
      sortable: true,
    },
    {
      label: "Edytowano",
      renderCell: row => row.updated_at
    },
      ]

      console.log(props.allReservations)
      let table = <p>tabela</p>;
      if (true) {
        table = <CompactTable columns={columns2} data={props.allReservations} theme={theme} progressPending={props.allReservations} />
      }
  return (
    <div>
      
      {/* {table} */}
     {props.allReservations&&  <DataTable title="Rezerwacje"
       columns={columns}
       data={props.allReservations}
       theme={theme}
   />
     }
     
      <ul>
        {props.allReservations &&
          props.allReservations.map((reservation) => (
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
