const { Router } = require("express");
const { postFavoritesHandler } = require("../handlers/favoritesHandlers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const favoritesRouter = Router();

favoritesRouter.post("/", authMiddleware, postFavoritesHandler);

module.exports = favoritesRouter;
