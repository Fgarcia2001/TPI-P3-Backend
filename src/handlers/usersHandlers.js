const { postUser, getUser } = require("../controllers/usersControllers");

const postUsersHandlers = async (req, res) => {
  try {
    const mensaje = await postUser();
    console.log(mensaje);
    res.status(200).send(mensaje);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUsersHandlers = async (req, res) => {
  try {
    const respuesta = await getUser();
    res.status(200).send(mensaje);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { postUsersHandlers, getUsersHandlers };
