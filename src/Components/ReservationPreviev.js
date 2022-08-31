import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AuthContext } from "../helpers/AuthContext";
import "../Home.css";
import "./ReservationPreview.css";

const ReservationPreview = (props) => {
  const [allReservations, setAllReservations] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const { authState } = useContext(AuthContext);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (window.confirm(`Are you sure you want to delete?`)) {
        setToggleCleared(!toggleCleared);
        // setData(differenceBy(data, selectedRows, "title"));
        deleteReservations();
        // window.location.reload();
      }
    };

    const deleteReservations = async () => {
      try {
        let arrayIds = [];
        if (selectedRows) {
          arrayIds = await selectedRows.map((e) => {
            return e.id_reservation;
          });
          if (arrayIds.length >= 4) {
            setToggleCleared(!toggleCleared);
            return;
          }
        }
        console.log(arrayIds);
        console.log(JSON.stringify(arrayIds));

        const data = await fetch("/reservation/deletereservations", {
          method: "DELETE",
          body: JSON.stringify(arrayIds),
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        });

        console.log("deleted reservations", data);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <button
        key="delete"
        onClick={handleDelete}
        className="material-symbols-outlined"
        style={{ backgroundColor: "#f24073ff", fontSize: "30px" }}
      >
        Delete
      </button>
    );
  }, [selectedRows, toggleCleared]);

  useEffect(() => {
    const fetchReservations = async (req, res, next) => {
      try {
        const response = await fetch("/reservation/info", {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        });
        // console.log(response);
        const json = await response.json();

        if (response.ok) {
          console.log(response);
          setAllReservations(json);
          console.log(allReservations);
        } else {
          return json.error;
        }
      } catch (error) {
        console.error("error z preview", error);
        next(error);
      }
    };
    console.log(allReservations);

    fetchReservations();
  }, [toggleCleared]);

  const CustomStyle = {
    noData: {
      style: {
        margin: "0%",
        padding: "0%",
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
        margin: "0px",
        minHeight: "40px",
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderBottomWidth: "3px",
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
    authState.role === "admin" && {
      name: "ID",
      selector: (row) => row.id_reservation,
      sortable: true,
      width: "68px",
    },
    {
      name: "Data Rezerwacji",
      selector: (row) => row.date,
      format: (row) => moment(row.date).format("ll"),
      sortable: true,
      width: "170px",
    },
    {
      name: "Godzina",
      selector: (row) => row.Hour,
      width: "92px",
    },
    {
      name: "Klient",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Telefon",
      selector: (row) => row.phone,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Stolik",
      selector: (row) => row.TableName,
      width: "100px",
    },

    {
      name: "Lokalizacja",
      selector: (row) => row.TableLocation,
      width: "120px",
    },
    {
      name: "Utworzono",
      selector: (row) => row.created_at,
      format: (row) => moment(row.created_at).locale("pl").format("lll"),
      sortable: true,
      width: "190px",
    },
    // {
    //   name: "Edytowano",
    //   selector: (row) => row.updated_at,
    //   format: (row) => moment(row.updated_at).format("lll"),

    //   sortable: true,
    // },
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
      label: "Telefon",
      renderCell: (row) => row.phone,
    },
    {
      label: "Email",
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
        onColumnOrderChange={(cols) => console.log(cols)}
      />
      <div className="warning">
        <p className="warning">
          Można usunąć maksymalnie 3 rezerwacje jednocześnie!
        </p>
      </div>

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
