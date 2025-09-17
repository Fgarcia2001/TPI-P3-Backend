const { Router } = require("express");
const { postOrdersHanlders } = require("../handlers/ordersHandlers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const ordersRouter = Router();

ordersRouter.post("/", authMiddleware, postOrdersHanlders);

module.exports = ordersRouter;
