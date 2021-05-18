const { getConnection } = require("../../db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { sendMail } = require("../../helpers");

async function createUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    //OBTENER LOS DATOS DE LA REQUEST
    const { email, password, name } = req.body;

    //COMPROBAR QUE LOS DATOS EXISTAN
    if (!email || !password) {
      throw new Error("Faltan datos para crear un usuario");
    }

    let user;
    //comprobar que no exista un usuario con el mismo email
    try {
      [user] = await connection.query(
        `
            SELECT *
            FROM users
            WHERE email=?
            `,
        [email]
      );
    } catch (error) {
      next(error);
    }

    //si el resultado de la consulta anterior es mayor que uno
    //hay coincidencia, por lo tanto, emito un error
    if (user.length > 0) {
      throw new Error("el usuario ya existe en la base de datos");
    }

    //CODIFICAR PASSWORD
    const passwordDb = await bcrypt.hash(password, 10);

    //CREAR CÓDIGO DE REGISTRO PARA FUTURA ACTIVACIÓN
    const registrationCode = crypto
      .randomBytes(20)
      .toString("hex")
      .slice(0, 20);

    //INTRODUCIRLOS EN LA BASE DE DATOS
    try {
      await connection.query(`
            INSERT INTO users(
                registrationDate,
                email,
                password,
                nombre,
                registrationCode,
                lastUpdate,
                lastAuthUpdate
                )
            VALUES(
                UTC_TIMESTAMP,
                "${email}",
                "${passwordDb}",
                "${name}",
                "${registrationCode}",
                UTC_TIMESTAMP,
                UTC_TIMESTAMP
            )
            `);
    } catch (error) {
      next(error);
    }

    //ENVIO DE EMAIL DE CONFIRMACIÓN DE CREACIÓN DE USUARIO
    const validationLink = `${process.env.DOMINIO}/activate/${registrationCode}`;

    await sendMail({
      to: email,
      subject: "Te acabas de registrar en Experiencias Gallaecia",
      message: `
            Muchas gracias por registrarte en Experiencias Gallaecia,
            pulsa el siguiente link para activar tu usuario:

            ${validationLink}
          `,
    });

    res.send({
      status: "ok",
      message: "Usuario creado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { createUser };
