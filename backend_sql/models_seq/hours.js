const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hours', {
    id_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'hours',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_hours" },
        ]
      },
      {
        name: "id_houres_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_hours" },
        ]
      },
    ]
  });
};
