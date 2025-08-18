const {
  postProducts,
  getProducts,
} = require("../controllers/productsControllers");

const postProductsHandlers = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, imagen, disponible } =
      req.body;
    const respuesta = await postProducts({
      nombre,
      descripcion,
      precio,
      categoria,
      imagen,
      disponible,
    });
    res.status(200).send(respuesta);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProductsHandlers = async (req, res) => {
  try {
    const productos = await getProducts();
    res.status(200).send(productos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { postProductsHandlers, getProductsHandlers };
