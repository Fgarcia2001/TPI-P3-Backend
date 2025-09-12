const sequelize = require("../db").conn;

// Importar modelos
const Mesa = require("./Mesa")(sequelize);
const Producto = require("./Producto")(sequelize);
const Orden = require("./Orden")(sequelize);
const OrdenProducto = require("./Orden_Producto")(sequelize);
const Notificacion = require("./Notificacion")(sequelize);
const Usuario = require("./Usuario")(sequelize);
const HistorialPedido = require("./Historial_Pedido")(sequelize);
//const Favorito = require("./Favorito")(sequelize);
const Categoria = require("./Categoria")(sequelize);
const Oferta = require("./Oferta")(sequelize);
// Importar asociaciones y ejecutarlas
const associate = require("./associations");
associate({
  Mesa,
  Producto,
  Orden,
  OrdenProducto,
  Notificacion,
  Usuario,
  HistorialPedido,
  //Favorito,
  Categoria,
  Oferta,
});

module.exports = {
  sequelize,
  Mesa,
  Producto,
  Orden,
  OrdenProducto,
  Notificacion,
  Usuario,
  HistorialPedido,
  Categoria,
  Oferta,
};
