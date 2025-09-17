const { postOrders } = require("../controllers/ordersControllers");

const postOrdersHanlders = async (req, res) => {
  try {
    const { id } = req.user;
    const { productos } = req.body;
    const orders = await postOrders(id, productos);
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { postOrdersHanlders };
