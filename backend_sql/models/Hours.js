const db = require("../config/db");

class Hour {
  constructor(name) {
    this.name = name;
  }

  static findAll() {
    let sql = "SELECT * from hours;";
    return db.execute(sql);
  }
}

module.exports = Hour;
