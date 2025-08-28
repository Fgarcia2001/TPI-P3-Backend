const { Router } = require("express");
const {
  postUsersHandlers,
  getUsersHandlers,
  googleUsersHandler,
} = require("../handlers/usersHandlers");

const usersRouter = Router();

usersRouter.post("/login", getUsersHandlers);
usersRouter.post("/signup", postUsersHandlers);
//usersRouter.post("/google-login", googleUsersHandlers);

module.exports = usersRouter;
