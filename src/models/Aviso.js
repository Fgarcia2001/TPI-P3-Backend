const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Aviso",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING, // Guarda la URL o ruta de la imagen
        allowNull: true,
      },
    },
    {
      tableName: "avisos",
      timestamps: true, // Crea createdAt y updatedAt
    }
  );
};
