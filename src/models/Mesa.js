const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Mesa",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      codigo_qr: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "mesas", // Opcional, Sequelize pluraliza automáticamente el nombre del modelo
    }
  );
};
