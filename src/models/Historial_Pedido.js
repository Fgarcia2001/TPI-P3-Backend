const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "HistorialPedido",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "historial_pedidos",
    }
  );
};
