const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Favorito",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      producto_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "favoritos",
      indexes: [
        {
          unique: true,
          fields: ["usuario_id", "producto_id"], // 🔒 evita duplicados
        },
      ],
    }
  );
};
