const { getConnection } = require("../../db");
const { uploadImage } = require("../../helpers");
async function UploadUserPhoto(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    const [currentPhotos] = await connection.query(
      `
        SELECT *
        FROM users
        WHERE id=?
      `,
      [id]
    );

    if (currentPhotos.foto === "") {
      throw new Error(currentPhotos.foto);
    }

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
        UPDATE  users
            SET lastUpdate=?, foto=?
            WHERE id=?
        
      `,
      [new Date(), savedPhotoName, id]
    );

    // Devolvemos una respuesta
    res.send({
      status: "ok",
      message: `Se añadió una foto de perfil al usurio con id ${id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  UploadUserPhoto,
};
