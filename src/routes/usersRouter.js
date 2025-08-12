const { Router } = require("express");
const {
  postUsersHandlers,
  getUsersHandlers,
} = require("../handlers/usersHandlers");

const usersRouter = Router();

usersRouter.post("/login", getUsersHandlers);
usersRouter.post("/signup", postUsersHandlers);

module.exports = usersRouter;
