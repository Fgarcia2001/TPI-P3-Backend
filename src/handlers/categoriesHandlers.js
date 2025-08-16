const {
  postCategories,
  getCategories,
} = require("../controllers/categoriesControllers");

const postCategoriesHandlers = async (req, res) => {
  try {
    const { categories } = req.body;
    const mensaje = await postCategories({ categories });
    res.status(200).send(mensaje);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getCategoriesHandlers = async (req, res) => {
  try {
    const mensaje = await getCategories();
    res.status(200).send(mensaje);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { postCategoriesHandlers, getCategoriesHandlers };
