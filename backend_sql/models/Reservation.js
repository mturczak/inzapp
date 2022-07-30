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
}

module.exports = Reservation;
