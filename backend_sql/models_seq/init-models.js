var DataTypes = require("sequelize").DataTypes;
var _clients = require("./clients");
var _hours = require("./hours");
var _reservations = require("./reservations");
var _tables = require("./tables");

function initModels(sequelize) {
  var clients = _clients(sequelize, DataTypes);
  var hours = _hours(sequelize, DataTypes);
  var reservations = _reservations(sequelize, DataTypes);
  var tables = _tables(sequelize, DataTypes);

  reservations.belongsTo(clients, { as: "id_clients_client", foreignKey: "id_clients"});
  clients.hasMany(reservations, { as: "reservations", foreignKey: "id_clients"});
  reservations.belongsTo(hours, { as: "id_hours_hour", foreignKey: "id_hours"});
  hours.hasMany(reservations, { as: "reservations", foreignKey: "id_hours"});
  reservations.belongsTo(tables, { as: "id_tables_table", foreignKey: "id_tables"});
  tables.hasMany(reservations, { as: "reservations", foreignKey: "id_tables"});

  return {
    clients,
    hours,
    reservations,
    tables,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
