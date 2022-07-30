const db = require("../config/db");

class Table {
  constructor(name, size, location) {
    (this.name = name), (this.size = size), (this.location = location);
  }

  async save() {
    let sql = `INSERT INTO tables(
        name,
        size,
        location
        )
    VALUES(
        '${this.name}',
        '${this.size}',
        '${this.location}'
    );
    `;

    const [newTable, _] = await db.execute(sql);

    return newTable;
  }

  static findById(id) {
    let sql = `SELECT * from tables where id_tables = ${id};`;
    return db.execute(sql);
  }

  static findByFilter(filter, value) {
    let sql = `SELECT * from tables where ${filter} = '${value}';`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * from tables;";
    return db.execute(sql);
  }
}

module.exports = Table;
