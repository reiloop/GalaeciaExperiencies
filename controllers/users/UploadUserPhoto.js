const { getConnection } = require("../../db");
const { uploadImage } = require("../../helpers");
async function UploadUserPhoto(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Comprobamos que la entrada del diario a la que le estamos añadiendo foto
    // tiene 3 o menos fotos añadidas

    const [currentPhotos] = await connection.query(
      `
        SELECT foto
        FROM users
        WHERE id=?
      `,
      [req.auth.id]
    );

    if (currentPhotos.length === 1) {
      throw new Error(
        `El usuario ya tiene una foto de perfil subida, debe actualizarla no subir otra`
      );
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
        UPDATE USERS users
            SET lastUpdate=?, foto=?
            WHERE id=?
        
      `,
      [new Date(), savedPhotoName, req.auth.id]
    );

    // Devolvemos una respuesta
    res.send({
      status: "ok",
      message: `Se añadió una foto de perfil al usurio con id ${req.auth.id}`,
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
