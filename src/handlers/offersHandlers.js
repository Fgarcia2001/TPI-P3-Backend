const { postOffers } = require("../controllers/offersControllers");

const postOffersHandler = async (req, res) => {
  try {
    const ofertas = await postOffers();
    res.status(200).send(ofertas);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { postOffersHandler };
