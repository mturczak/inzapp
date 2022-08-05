const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clients', {
    id_clients: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "phone_UNIQUE"
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "email_UNIQUE"
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    hasAccount: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    role: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "client"
    }
  }, {
    sequelize,
    tableName: 'clients',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_clients" },
        ]
      },
      {
        name: "phone_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
