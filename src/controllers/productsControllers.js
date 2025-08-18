const { Producto, Categoria, sequelize } = require("../models");

const postProducts = async ({
  nombre,
  descripcion,
  precio,
  categoria,
  imagen,
  disponible,
}) => {
  // 1. Validaciones obligatorias
  if (!nombre || !precio || disponible === undefined) {
    throw new Error("Los campos nombre, precio y disponible son obligatorios.");
  }

  if (typeof disponible !== "boolean") {
    throw new Error("El campo disponible debe ser true o false.");
  }

  if (isNaN(precio) || Number(precio) <= 0) {
    throw new Error("El precio debe ser un número mayor a 0.");
  }

  // 2. Chequear si ya existe un producto con ese nombre (case insensitive)
  const existeProducto = await Producto.findOne({
    where: { nombre: nombre.trim() },
  });

  if (existeProducto) {
    throw new Error("Ya existe un producto con ese nombre.");
  }

  // 3. Manejar la categoría
  let categoriaDB = null;
  if (categoria) {
    const nombreCategoria = categoria.trim().toLowerCase();
    categoriaDB = await Categoria.findOne({
      where: sequelize.where(
        sequelize.fn("lower", sequelize.col("nombre")),
        nombreCategoria
      ),
    });

    if (!categoriaDB) {
      categoriaDB = await Categoria.create({
        nombre: categoria.trim(),
      });
    }
  }

  // 4. Crear producto
  const nuevoProducto = await Producto.create({
    nombre: nombre.trim(),
    descripcion: descripcion || null,
    precio: parseFloat(precio),
    disponible,
    imagen: imagen || null,
    categoriaId: categoriaDB ? categoriaDB.id : null,
  });

  return nuevoProducto;
};

const getProducts = async () => {
  // Traemos los productos tal cual están en la tabla
  const productos = await Producto.findAll({
    attributes: [
      "id",
      "nombre",
      "descripcion",
      "imagen",
      "precio",
      "disponible",
      "categoriaId",
    ],
  });

  // Verificamos si no hay productos
  if (!productos || productos.length === 0) {
    throw new Error("No hay productos cargados en la base de datos.");
  }

  // Convertimos a JSON simple (opcional)
  return productos.map((prod) => ({
    id: prod.id,
    nombre: prod.nombre,
    descripcion: prod.descripcion,
    imagen: prod.imagen,
    precio: prod.precio,
    disponible: prod.disponible,
    categoriaId: prod.categoriaId, // se mantiene tal cual en la tabla
  }));
};

module.exports = { postProducts, getProducts };
