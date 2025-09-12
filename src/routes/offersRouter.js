const { Router } = require("express");
const { postOffersHandler } = require("../handlers/offersHandlers");
const offersRouter = Router();

offersRouter.post("/", postOffersHandler);

module.exports = offersRouter;
