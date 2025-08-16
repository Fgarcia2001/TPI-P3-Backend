const { Router } = require("express");
const {
  postCategoriesHandlers,
  getCategoriesHandlers,
} = require("../handlers/categoriesHandlers");
const categoriesRouter = Router();

categoriesRouter.post("/", postCategoriesHandlers);
categoriesRouter.get("/", getCategoriesHandlers);

module.exports = categoriesRouter;
