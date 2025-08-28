const {
  postUser,
  getUser,
  googleLogin,
} = require("../controllers/usersControllers");

const postUsersHandlers = async (req, res) => {
  try {
    const { email, contrasena, nombre, apellido, telefono } = req.body;
    const mensaje = await postUser({
      email,
      contrasena,
      nombre,
      apellido,
      telefono,
    });
    res.status(201).json(mensaje);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsersHandlers = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const respuesta = await getUser({ email, contrasena });
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const googleUsersHandlers = async (req, res) => {
  try {
    const { credential } = req.body; // viene del frontend
    const respuesta = await googleLogin(credential);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postUsersHandlers, getUsersHandlers /*googleUserHanders*/ };
