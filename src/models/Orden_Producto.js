const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "OrdenProducto",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "ordenes_productos",
    }
  );
};
