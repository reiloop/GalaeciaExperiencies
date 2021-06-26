const { getConnection } = require("../../db");
const { uploadImage } = require("../../helpers");

async function addUserPhoto(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Guardamos la foto enviada en un directorio y sacamos el nombre del fichero
    let savedPhotoName;

    if (req.files && req.files.photo) {
      savedPhotoName = await uploadImage({
        file: req.files.photo,
        directory: "avatars",
      });
    } else {
      throw new Error("No subiste ninguna foto");
    }

    // Actualizamos la base de datos
    await connection.query(
      `
      INSERT INTO users(lastUpdate, foto)
      VALUES(?,?)
    `,
      [new Date(), savedPhotoName]
    );

    // Devolvemos una respuesta
    res.send({
      status: "ok",
      message: `El usuario añadió correctamente un avatar con nombre ${savedPhotoName}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  addUserPhoto,
};
