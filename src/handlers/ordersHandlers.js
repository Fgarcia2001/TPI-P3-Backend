const postOrdersHanlders = async (req, res) => {
  try {
    const orders = await postOrders();
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { postOrdersHanlders };
