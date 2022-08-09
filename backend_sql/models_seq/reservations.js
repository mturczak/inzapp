const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reservations', {
    id_reservation: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_clients: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clients',
        key: 'id_clients'
      }
    },
    id_tables: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tables',
        key: 'id_tables'
      }
    },
    id_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hours',
        key: 'id_hours'
      }
    }
  }, {
    sequelize,
    tableName: 'reservations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "id_reservation_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_reservation" },
        ]
      },
      {
        name: "fk_reservation_clients_idx",
        using: "BTREE",
        fields: [
          { name: "id_clients" },
        ]
      },
      {
        name: "fk_reservation_tables1_idx",
        using: "BTREE",
        fields: [
          { name: "id_tables" },
        ]
      },
      {
        name: "fk_reservation_houres1_idx",
        using: "BTREE",
        fields: [
          { name: "id_hours" },
        ]
      },
    ]
  });
};

