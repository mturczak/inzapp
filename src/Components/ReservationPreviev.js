import { fontSize } from "@mui/system";
import { Button } from "bootstrap";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "../Home.css";
import "./ReservationPreview.css";

const ReservationPreview = (props) => {
  const [allReservations, setAllReservations] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.title
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        // setData(differenceBy(data, selectedRows, "title"));
      }
    };

    return (
      
      <button
        key="delete"
        onClick={handleDelete}
        className="material-symbols-outlined"
        style={{ backgroundColor: "#f24073ff",
        fontSize: "30px" }}
        icon
      >
        Delete
      </button>
    );
  }, [ selectedRows, toggleCleared]);

  useEffect(() => {
    const fetchReservations = async (req, res, next) => {
      try {
        const response = await fetch("/reservation/info",{
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        });
        // console.log(response);
        const json = await response.json();
        
        if (response.ok) {
          console.log(response);
          setAllReservations(json);
        }else{
          return json.error;
        }
      } catch (error) {
        console.error("error z preview", error)
        next(error);
      }
      
    };

    fetchReservations();
  }, []);

  const CustomStyle = {
    noData: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      },
    },

    rows: {
      style: {
        zIndex: 2,
        minHeight: "30px !important", // override the row height
        fontSize: "14px",
        whiteSpace: "pre",
      },
    },
    table: {
      style: {
        zIndex: 1,
      },
    },
    headRow: {
      style: {
        minHeight: "40px",
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderBottomWidth: "2px",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        justifyContent: "left",
        wordWrap: "breakWord",
      },
    },
    subHeader: {
      style: {
        minHeight: "40px",
      },
    },
    pagination: {
      style: {
        minHeight: "40px",
      },
      pageButtonsStyle: {
        borderRadius: "50%",
        height: "40px",
        width: "40px",
        padding: "8px",
        margin: "px",
        cursor: "pointer",
      },
    },
  };
  const columns = [
    {
      name: "ID Rezerwacji",
      selector: (row) => row.id_reservation,
      sortable: true,
      width: "5%",
    },
    {
      name: "Data Rezerwacji",
      selector: (row) => row.date,
      format: (row) => moment(row.date).format("ll"),
      sortable: true,
    },
    {
      name: "Godzina",
      selector: (row) => row.Hour,
      width: "6%",
    },
    {
      name: "Klient",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "phone",
      selector: (row) => row.phone,
    },
    {
      name: "mail",
      selector: (row) => row.email,
    },
    {
      name: "Stolik",
      selector: (row) => row.TableName,
      width: "6%",
    },

    {
      name: "Lokalizacja",
      selector: (row) => row.TableLocation,
      width: "6%",
    },
    {
      name: "Utworzono",
      selector: (row) => row.created_at,
      format: (row) => moment(row.created_at).locale("pl").format("lll"),
      sortable: true,
    },
    {
      name: "Edytowano",
      selector: (row) => row.updated_at,
      format: (row) => moment(row.updated_at).format("lll"),

      sortable: true,
    },
  ];
  const columns2 = [
    {
      label: "ID Rezerwacji",
      renderCell: (row) => row.id_reservation,
    },
    {
      label: "Data Rezerwacji",
      renderCell: (row) => row.date,
    },
    {
      label: "Godzina",
      renderCell: (row) => row.Hour,
    },
    {
      label: "Klient",
      renderCell: (row) => row.name,
    },
    {
      label: "phone",
      renderCell: (row) => row.phone,
    },
    {
      label: "mail",
      renderCell: (row) => row.email,
    },
    {
      label: "Stolik",
      renderCell: (row) => row.TableName,
    },
    {
      label: "Lokalizacja",
      renderCell: (row) => row.TableLocation,
    },
    {
      label: "Utworzono",
      renderCell: (row) => row.created_at,
      sortable: true,
    },
    {
      label: "Edytowano",
      renderCell: (row) => row.updated_at,
    },
  ];

  console.log(allReservations);

  return (
    <div className="reservation_preview">
      {allReservations && (
        <DataTable
          title="Rezerwacje"
          columns={columns}
          data={allReservations}
          customStyles={CustomStyle}
          defaultSortFieldId={1}
          defaultSortAsc={0}
          pagination
          highlightOnHover
          selectableRows
          persistTableHead
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      )}

      {/* <ul>
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
      </ul> */}
    </div>
  );
};

export default ReservationPreview;
