const { getConnection } = require("../../db");

async function getEntry(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de los parámetros
    const { id } = req.params;

    // Ejecuto la consulta
    const [result] = await connection.query(
      `
      SELECT actividades.nombre, actividades.id, actividades.fecha_creacion, actividades.descripcion, actividades.categoria, actividades.localidad, AVG(comentarios.voto) as votes
      FROM actividades
      LEFT JOIN comentarios ON actividades.id = comentarios.id_actividad
      WHERE actividades.id=?
    `,
      [id]
    );

    if (result.length < 1) {
      throw new Error("La entrada no existe");
    }

    const data = result[0];

    // Saco de la base de datos las fotos asociadas a esta entrada

    const [photos] = await connection.query(
      `
      SELECT uploadedDate, imagen
      FROM imagenes
      WHERE id_actividad=?
    `,
      [id]
    );

    data.photos = photos;

    // Devuelvo los datos
    res.send({
      status: "ok",
      data: data,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  getEntry,
};
