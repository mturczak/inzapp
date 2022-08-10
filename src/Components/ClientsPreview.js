import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "../Home.css";
import "./ClientsPreview.css";

const ClientsPreview = (props) => {
  const [allClients, setAllClients] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

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
        let arrayIds=[];
        if (selectedRows) {
          arrayIds = selectedRows.map((e) => {
            return e.id_clients;
          });
          console.log(arrayIds);
          if (arrayIds.length >= 2) {
            setToggleCleared(!toggleCleared);
            return;
          }
        }
        console.log(arrayIds);
        console.log(JSON.stringify(arrayIds));

        if (arrayIds) {
          const data = await fetch("/reservation/deleteclients", {
            method: "DELETE",
            body: JSON.stringify(arrayIds),
            headers: {
              accessToken: sessionStorage.getItem("accessToken"),
              "Content-Type": "application/json",
            },
          });

          console.log("deleted clients", data);
        }
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
    const fetchClients = async (req, res, next) => {
      try {
        const response = await fetch("/reservation/clientsVT", {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        });
        // console.log(response);
        const json = await response.json();

        if (response.ok) {
          console.log(response);
          setAllClients(json);
          console.log(allClients);
        } else {
          return json.error;
        }
      } catch (error) {
        console.error("error z preview", error);
        next(error);
      }
    };
    console.log(allClients);

    fetchClients();
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
    {
      name: "ID Klienta",
      selector: (row) => row.id_clients,
      sortable: true,
      width: "5%",
    },
    {
      name: "Nazwa",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Telefon",
      selector: (row) => row.phone,
      width: "6%",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Hasło hash",
      selector: (row) => row.password,
    },
    {
      name: "Konto?(T/N)",
      selector: (row) => row.hasAccount,
    },
    {
      name: "Typ",
      selector: (row) => row.role,
      width: "6%",
    },
    {
      name: "Utworzony",
      selector: (row) => row.created_at,
      format: (row) => moment(row.created_at).locale("pl").format("lll"),
      sortable: true,
    },
    {
      name: "Edytowany",
      selector: (row) => row.updated_at,
      format: (row) => moment(row.updated_at).format("lll"),

      sortable: true,
    },
  ];

  console.log(allClients);

  return (
    <div className="reservation_preview">
      <DataTable
        title="Klienci"
        columns={columns}
        data={allClients}
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
      <div className="warning"><p className="warning">Można usunąć maksymalnie 1 klienta jednocześnie!</p></div>
      <div className="warning2"><p className="warning2">Uwaga! Podczas usunięcia klienta zostaną usunięte wszystkie jego rezerwacje!</p></div>
    </div>
  );
};

export default ClientsPreview;
