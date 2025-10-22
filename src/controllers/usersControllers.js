const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");
//const { OAuth2Client } = require("google-auth-library");

const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_super_segura";
//const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

//const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const ROLES_VALIDOS = ["cliente", "admin", "sysadmin"];

// registro de usuario
const postUser = async ({
  email,
  contrasena,
  nombre,
  apellido,
  telefono,
  rol,
}) => {
  if (!email || !contrasena || !nombre || !apellido || !telefono) {
    throw new Error("Todos los campos son obligatorios");
  }

  email = email.toLowerCase().trim();
  nombre = nombre.toLowerCase().trim();
  apellido = apellido.toLowerCase().trim();

  // Validamos email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("El formato del email no es válido");
  }

  if (contrasena.length < 5) {
    throw new Error("La contraseña debe tener al menos 5 caracteres");
  }

  // Validamos telefono con solo numeros
  const telefonoRegex = /^[0-9]+$/;
  if (!telefonoRegex.test(telefono)) {
    throw new Error("El teléfono debe contener solo números");
  }

  // Validamos que el mail no este registrado

  const existente = await Usuario.findOne({ where: { email } });
  if (existente) throw new Error("Email ya registrado");

  // Validamos que el telefono no este registrado

  const telefonoExistente = await Usuario.findOne({ where: { telefono } });
  if (telefonoExistente) throw new Error("El teléfono ya está registrado");

  //hashear la contraseña antes de guardar
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

  const nuevoUsuario = await Usuario.create({
    email,
    contrasena: hashedPassword, // guardamos la hash
    nombre,
    apellido,
    telefono,
    rol,
  });

  const token = jwt.sign(
    { id: nuevoUsuario.id, email: nuevoUsuario.email, rol: nuevoUsuario.rol },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    message: "Usuario creado con éxito",
    token,
    user: {
      nombre: nuevoUsuario.nombre,
      apellido: nuevoUsuario.apellido,
      telefono: nuevoUsuario.telefono,
    },
  };
};

// login de usuario
const getUser = async ({ email, contrasena }) => {
  //Validamos si existe el email primero

  email = email.toLowerCase().trim();

  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error("Usuario no encontrado");

  // validar contraseña (hash vs ingresada)
  const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!validPassword) throw new Error("Contraseña incorrecta");

  // generar JWT
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    message: "Login exitoso",
    token,
    user: {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono,
    },
  };
};

const getAllUsers = async () => {
  const usuarios = await Usuario.findAll({
    attributes: {
      exclude: ["contrasena", "googleId", "createdAt", "updatedAt"],
    },
  });
  // si no existe usuarios igualmente retorno array vacio
  return usuarios;
};

const putUser = async ({ id, rol }) => {
  // 1. Validar que venga el id
  if (!id) {
    throw new Error("El parámetro 'id' es obligatorio");
  }

  // 2. Validar que sea un número entero positivo
  if (isNaN(id) || parseInt(id) <= 0) {
    throw new Error("El 'id' debe ser un número entero válido");
  }

  // 3. Validar que venga el rol
  if (!rol) {
    throw new Error("El campo 'rol' es obligatorio");
  }

  // 4. Validar que el rol sea uno de los permitidos
  if (!ROLES_VALIDOS.includes(rol)) {
    throw new Error(
      `Rol inválido. Los roles permitidos son: ${ROLES_VALIDOS.join(", ")}`
    );
  }

  // 5. Buscar el usuario
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    throw new Error(`Usuario con id ${id} no encontrado`);
  }

  // 6. Si ya tiene el mismo rol, avisar
  if (usuario.rol === rol) {
    throw new Error(`El usuario ya tiene el rol ${rol}`);
  }

  // 7. Actualizar el rol
  usuario.rol = rol;
  await usuario.save();

  // 8. Retornar el usuario actualizado (sin la contrasenia por seguridad)
  const { contrasena, ...usuarioSinPass } = usuario.toJSON();
  return usuarioSinPass;
};

const deleteUser = async ({ id }) => {
  // 1. Validar que venga id
  if (!id) {
    throw new Error("El parámetro 'id' es obligatorio");
  }

  // 2. Validar que sea un número válido
  if (isNaN(id) || parseInt(id) <= 0) {
    throw new Error("El 'id' debe ser un número entero válido");
  }

  // 3. Buscar usuario
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    throw new Error(`Usuario con id ${id} no encontrado`);
  }

  // 4. Eliminar usuario
  await usuario.destroy();

  return `Usuario con id ${id} eliminado correctamente`;
};

// Login con Google (sin cambios)
/* const googleLogin = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, name, picture, sub } = payload;

  let usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    usuario = await Usuario.create({
      email,
      nombre: name,
      contrasena: null, // null porque viene de Google
      googleId: sub,
      fotoPerfil: picture,
    });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    message: "Login con Google exitoso",
    token,
    user: {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      fotoPerfil: usuario.fotoPerfil,
    },
  };
}; */

module.exports = {
  postUser,
  getUser,
  getAllUsers,
  putUser,
  deleteUser /*googleLogin*/,
};
