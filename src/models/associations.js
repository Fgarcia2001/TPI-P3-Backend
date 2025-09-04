module.exports = (models) => {
  const {
    Mesa,
    Producto,
    Orden,
    OrdenProducto,
    Notificacion,
    Usuario,
    HistorialPedido,
    Favorito,
    Categoria,
    Aviso,
  } = models;

  Mesa.hasMany(Orden, { foreignKey: "mesa_id" });
  Orden.belongsTo(Mesa, { foreignKey: "mesa_id" });

  Orden.belongsToMany(Producto, {
    through: OrdenProducto,
    foreignKey: "orden_id",
  });
  Producto.belongsToMany(Orden, {
    through: OrdenProducto,
    foreignKey: "producto_id",
  });

  Orden.hasMany(Notificacion, { foreignKey: "orden_id" });
  Notificacion.belongsTo(Orden, { foreignKey: "orden_id" });

  Usuario.belongsToMany(Orden, {
    through: HistorialPedido,
    foreignKey: "usuario_id",
  });
  Orden.belongsToMany(Usuario, {
    through: HistorialPedido,
    foreignKey: "orden_id",
  });

  Usuario.belongsToMany(Producto, {
    through: "Favoritos",
    foreignKey: "usuario_id",
  });
  Producto.belongsToMany(Usuario, {
    through: "Favoritos",
    foreignKey: "producto_id",
  });

  Producto.belongsTo(Categoria, { foreignKey: "categoriaId" });
  Categoria.hasMany(Producto, { foreignKey: "categoriaId" });
};
