const { Router } = require("express");
const {
  postProductsHandlers,
  getProductsHandlers,
} = require("../handlers/productsHandlers");
const productsRouter = Router();

productsRouter.post("/", postProductsHandlers);
productsRouter.get("/", getProductsHandlers);

module.exports = productsRouter;
