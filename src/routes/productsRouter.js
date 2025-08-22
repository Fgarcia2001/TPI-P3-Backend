const { Router } = require("express");
const {
  postProductsHandlers,
  getProductsHandlers,
  putProductsHandlers,
  deleteProductsHandlers,
} = require("../handlers/productsHandlers");
const productsRouter = Router();

productsRouter.post("/", postProductsHandlers);
productsRouter.get("/", getProductsHandlers);
productsRouter.put("/:id", putProductsHandlers);
productsRouter.delete("/:id", deleteProductsHandlers);
module.exports = productsRouter;
