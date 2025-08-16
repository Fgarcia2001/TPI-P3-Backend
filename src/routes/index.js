const { Router } = require("express");
const usersRouter = require("./usersRouter");
const productsRouter = require("./productsRouter");
const categoriesRouter = require("./categoriesRouter");
const router = Router();

router.use("/user", usersRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
module.exports = router;
