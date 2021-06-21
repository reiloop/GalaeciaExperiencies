const { getConnection } = require("../../db");
const { deleteImage } = require("../../helpers");

async function deleteEntryPhoto(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    // Sacamos de req.params la id de la entrada del diario y de la foto
    const { id, photoID } = req.params;

    // Comprobamos que la foto existe y está asociada a la entrada del diario

    const [photos] = await connection.query(
      `
      SELECT imagen
      FROM imagenes
      WHERE id_actividad=? AND id=?
    `,
      [id, photoID]
    );

    if (photos.length < 1) {
      throw new Error(
        "La foto no existe o no está asociada a la la entrada del diario indicada"
      );
    }

    // Borramos la foto del disco
    await deleteImage({
      file: photos[0].imagen,
      directory: "images",
    });

    // Actualizamos la base de datos

    await connection.query(
      `
      DELETE FROM imagenes
      WHERE id=? AND id_actividad=?
    `,
      [photoID, id]
    );

    // Damos una respuesta
    res.send({
      status: "ok",
      message: `La foto con id ${photoID} fue borrada`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { deleteEntryPhoto };
