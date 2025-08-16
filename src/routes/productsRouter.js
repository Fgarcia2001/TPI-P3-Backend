const { Router } = require("express");
const { postProductsHandlers } = require("../handlers/productsHandlers");
const productsRouter = Router();

productsRouter.post("/", postProductsHandlers);
//productRouter.get("/");

module.exports = productsRouter;
