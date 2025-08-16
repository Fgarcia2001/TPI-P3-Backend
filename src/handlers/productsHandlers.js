const { postProducts } = require("../controllers/productsControllers");

const postProductsHandlers = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, imagen } = req.body;
    const respuesta = await postProducts();
    res.status(200).send(respuesta);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { postProductsHandlers };
