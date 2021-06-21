const { getConnection } = require("../../db");
const { uploadImage } = require("../../helpers");

async function addEntryPhoto(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.params; // id de la entrada de diario

    // Comprobamos que la entrada del diario a la que le estamos añadiendo foto
    // tiene 3 o menos fotos añadidas
    const maxEntryPhotos = Number(process.env.MAX_ENTRY_PHOTOS);

    const [currentPhotos] = await connection.query(
      `
      SELECT *
      FROM imagenes
      WHERE id_actividad=?
    `,
      [id]
    );

    if (currentPhotos.length === maxEntryPhotos) {
      throw new Error(
        `La entrada ya tiene ${maxEntryPhotos} añadidas. Borra una antes de añadir una nueva`
      );
    }

    // Guardamos la foto enviada en un directorio y sacamos el nombre del fichero
    let savedPhotoName;

    if (req.files && req.files.photo) {
      savedPhotoName = await uploadImage({
        file: req.files.photo,
        directory: "images",
      });
    } else {
      throw new Error("No subiste ninguna foto");
    }

    // Actualizamos la base de datos
    await connection.query(
      `
      INSERT INTO imagenes(uploadedDate, imagen, id_actividad)
      VALUES(?,?,?)
    `,
      [new Date(), savedPhotoName, id]
    );

    // Devolvemos una respuesta
    res.send({
      status: "ok",
      message: `Se añadió una foto a la entrada del diario con id ${id}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  addEntryPhoto,
};
