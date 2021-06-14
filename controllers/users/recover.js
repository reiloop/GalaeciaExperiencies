const { getConnection } = require("../../db");
const { sendMail } = require("../../helpers");
const crypto = require("crypto");

async function recover(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { email } = req.body;

    let user;

    try {
      [user] = await connection.query(
        `
            SELECT *
            FROM users
            WHERE email = ?
            `,
        [email]
      );
    } catch (error) {
      throw new Error("No se ha podido encontrar al usuario en la base de datos");
    }

    if (user.length < 1) {
      throw new Error(
        "No existe ningún usuario con la dirección de email indicada"
      );
    }

    const code = crypto.randomBytes(20).toString("hex").slice(0, 20);

    try {
      await connection.query(
        `
            UPDATE users
            SET registrationCode = ?
            WHERE email = ?
            `,
        [code, email]
      );
    } catch (error) {
      throw new Error("No se ha podido actualizar el usuario");
    }

    const recoverLink = `${process.env.DOMINIO}/reset/${code}`;
    await sendMail({
      to: email,
      subject: "Recuperación de contraseña",
      message: `
            Hola, parece que has solicitado recuperar tu contraseña, para resetearla pulsa en el siguiente enlace:

            ${recoverLink}
          `,
    });

    res.send("taraaaaaa");
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { recover };
