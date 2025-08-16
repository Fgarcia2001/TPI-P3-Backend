const { Categoria } = require("../models"); // Importa el modelo desde donde centralizas sequelize

const postCategories = async ({ categories }) => {
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    throw new Error("Debes enviar al menos una categoría en un array");
  }

  const results = {
    creadas: [],
    existentes: [],
  };

  // Normalizo nombres (trim y minúsculas para comparar)
  for (const cat of categories) {
    if (typeof cat !== "string" || cat.trim() === "") {
      throw new Error(
        "El nombre de cada categoría debe ser un string no vacío"
      );
    }

    const nombreNormalizado = cat.trim();

    // Buscar si ya existe
    const existente = await Categoria.findOne({
      where: { nombre: nombreNormalizado },
    });

    if (existente) {
      results.existentes.push(nombreNormalizado);
    } else {
      const nueva = await Categoria.create({ nombre: nombreNormalizado });
      results.creadas.push(nueva.nombre);
    }
  }

  return {
    message: "Operación completada",
    ...results,
  };
};

const getCategories = async () => {
  const categorias = await Categoria.findAll({
    attributes: ["id", "nombre"], // solo traemos lo que importa
    order: [["nombre", "ASC"]], // orden alfabético
  });

  if (!categorias || categorias.length === 0) {
    throw new Error("No hay categorías cargadas");
  }

  return categorias;
};

module.exports = { postCategories, getCategories };
