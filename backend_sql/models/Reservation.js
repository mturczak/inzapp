const { dblClick } = require("@testing-library/user-event/dist/click");
const db = require("../config/db");

class Reservation {
  constructor(date, id_clients, id_tables, id_hours) {
    (this.date = date),
      (this.id_clients = id_clients),
      (this.id_tables = id_tables),
      (this.id_hours = id_hours);
  }

  async save() {
    let sql = `    INSERT INTO reservations(
        date,
        id_clients,
        id_tables,
        id_hours
        )
    VALUES(
        '${this.date}',
        '${this.id_clients}',
        '${this.id_tables}',
        '${this.id_hours}'
    );
    `;

    const [newReservation, _] = await db.execute(sql);

    return newReservation;
  }

  static findById(filter, id) {
    let sql = `SELECT * from reservations where ${filter} = ${id};`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * from reservations ORDER BY id_reservation DESC;";
    return db.execute(sql);
  }
  static findAllWithInfo() {
    let sql = `SELECT R.id_reservation, date, H.name AS Hour, C.name, C.phone, C.email, T.name AS TableName, T.location AS TableLocation, R.created_at, R.updated_at FROM inz_app.reservations R
    LEFT JOIN tables T ON  R.id_tables = T.id_tables
    LEFT JOIN Clients C ON R.id_clients = C.id_clients
    LEFT JOIN hours H ON R.id_hours=H.id_hours ORDER BY date ASC, H.name ;`;
    return db.execute(sql);
  }

  static findAllWithInfoById(id) {
    let sql = `SELECT R.id_reservation, date, H.name AS Hour, C.name, C.phone, C.email, T.name AS TableName, T.location AS TableLocation, R.created_at, R.updated_at FROM inz_app.reservations R
    LEFT JOIN tables T ON  R.id_tables = T.id_tables
    LEFT JOIN Clients C ON R.id_clients = C.id_clients
    LEFT JOIN hours H ON R.id_hours=H.id_hours WHERE R.id_clients = ${id} ORDER BY date ASC, H.name ;`;
    return db.execute(sql);
  }

  static findReserved(date, id_tables, id_hours) {
    let temphours = parseInt(id_hours) - 1;
    let sql = `SELECT * FROM reservations where date ='${date}' and id_tables = ${id_tables} and (id_hours = ${id_hours} OR id_hours = ${temphours} );`;
    console.log(sql);
    return db.execute(sql);
  }

  static findAllReservedFromDate(date) {
    let sql = `SELECT date, id_tables, hours.name as time, hours.id_hours FROM inz_app.reservations left join hours on reservations.id_hours = hours.id_hours where  date ='${date}';`;
    console.log(sql);
    return db.execute(sql);
  }
}

module.exports = Reservation;
