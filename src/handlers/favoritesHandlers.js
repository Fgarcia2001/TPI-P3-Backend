const { postFavorites } = require("../controllers/favoritesControllers");

const postFavoritesHandler = async (req, res) => {
  try {
    const {productId} = req.body
    res.status(200).send({ message: respuesta });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
module.exports = {
  postFavoritesHandler,
};
