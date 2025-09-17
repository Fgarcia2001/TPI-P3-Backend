const { Orden, Producto } = require("../models");

const postOrders = async (usuario_id, productos) => {
  // 1. Calcular el total de la orden
  let total = 0;
  for (const item of productos) {
    const producto = await Producto.findByPk(item.id);
    if (!producto) throw new Error(`Producto con id ${item.id} no existe`);
    total += producto.precio * item.cantidad;
  }

  // 2. Crear la orden
  const orden = await Orden.create({
    usuario_id,
    total,
    estado: "pendiente",
  });

  // 3. Asociar productos a la orden (muchos a muchos)
  for (const item of productos) {
    const producto = await Producto.findByPk(item.id);
    await orden.addProducto(producto, {
      through: { cantidad: item.cantidad, precio: producto.precio },
    });
  }

  // 4. Devolver la orden con los productos incluidos
  const ordenConProductos = await Orden.findByPk(orden.id, {
    include: {
      model: Producto,
      through: { attributes: ["cantidad", "precio"] },
    },
  });

  return ordenConProductos;
};

module.exports = { postOrders };
