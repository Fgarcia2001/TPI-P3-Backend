const { Orden, Producto } = require("../models");

const postOrders = async (usuario_id, productos) => {
  // 1. Calcular el total
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

  // 3. Asociar productos
  for (const item of productos) {
    const producto = await Producto.findByPk(item.id);
    await orden.addProducto(producto, {
      through: { cantidad: item.cantidad, precio: producto.precio },
    });
  }

  // 4. Buscar la orden con productos (filtrando atributos)
  const ordenConProductos = await Orden.findByPk(orden.id, {
    attributes: ["id", "fecha", "estado", "total", "usuario_id"],
    include: [
      {
        model: Producto,
        attributes: ["id", "nombre", "precio"], // solo estas columnas
        through: {
          attributes: ["cantidad", "precio"], // recuperamos para transformarlo
        },
      },
    ],
  });

  // 5. Transformar la respuesta
  const ordenFinal = {
    ...ordenConProductos.toJSON(),
    Productos: ordenConProductos.Productos.map((prod) => ({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      OrdenProducto: {
        cantidad: prod.OrdenProducto.cantidad,
        subtotal: prod.OrdenProducto.cantidad * prod.precio, // calculamos subtotal
      },
    })),
  };

  return ordenFinal;
};

module.exports = { postOrders };
