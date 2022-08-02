const db = require("../config/db");

class Client {
  constructor(name, phone, email) {
    (this.name = name), (this.phone = phone), (this.email = email);
  }

  async save() {
    let sql = `INSERT INTO clients(
        name,
        phone,
        email
        )
    VALUES(
        '${this.name}',
        '${this.phone}',
        '${this.email}'
    );
    `;

    const [newClient, _] = await db.execute(sql);

    return newClient;
  }

  static findById(id) {
    let sql = `SELECT * from clients where id_clients = ${id};`;
    return db.execute(sql);
  }

  static findByFilter(filter, value) {
    let sql = `SELECT * from clients where ${filter} = '${value}';`;
    console.log(sql);
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * from clients;";
    return db.execute(sql);
  }
}

module.exports = Client;
