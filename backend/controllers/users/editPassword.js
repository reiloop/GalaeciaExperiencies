const { getConnection } = require("../../db");
const bcrypt = require("bcrypt");

async function editPassword(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { oldPassword, newPassword, newPassword2 } = req.body;

    const { id } = req.params;

    if (newPassword !== newPassword2) {
      throw new Error("La contraseña no coincide");
    }

    //OBTENGO USUARIO EN BASE AL ID DE LA RUTA
    let existingUser;
    try {
      [existingUser] = await connection.query(
        `
            SELECT *
            FROM users
            WHERE id=?
            `,
        [id]
      );
    } catch (error) {
      throw new Error("No se encontró al usuario en la base de datos");
    }

    //OBTENGO LA CONTRASEÑA CODIFICADA DEL USUARIO EN LA BASE DE DATOS
    const passwordCoded = existingUser[0].password;

    //COMPARAMOS LA CONTRASEÑA DEL USUARIO DEL BODY CON LA DE LA BASE DE DATOS
    try {
      const isValid = await bcrypt.compare(oldPassword, passwordCoded);
      if (isValid === false) {
        throw new Error(
          "La contraseña introducida no coincide con la almacenada en la base de datos"
        );
      }
    } catch (error) {
      throw new Error("No se han podido comparar las contraseñas");
    }

    let passwordDb;
    try {
      passwordDb = await bcrypt.hash(newPassword, 10);
    } catch (error) {
      throw new Error("la contraseña no se pudo codificar");
    }

    try {
      await connection.query(
        `
            UPDATE users
            SET password=?
            WHERE id=?
            `,
        [passwordDb, id]
      );
    } catch (error) {
      throw new Error("No se ha podido actualizar el usuario");
    }

    res.send("contraseña actualizada");
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editPassword };
