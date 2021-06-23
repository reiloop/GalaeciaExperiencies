const { getConnection } = require("../../db");

async function listEntries(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    const { search } = req.query;

    let result;

    // Seleccionamos todas las entradas del diario (sin las fotos)
    if (search) {
      [result] = await connection.query(
        `
      SELECT actividades.*, AVG(comentarios.voto) as votes
      FROM actividades
      LEFT JOIN comentarios ON actividades.id = comentarios.id_actividad
      WHERE actividades.localidad LIKE CONCAT("%", ? , "%") OR actividades.descripcion LIKE CONCAT("%", ? , "%") OR actividades.precio LIKE CONCAT("%", ? , "%")
      GROUP BY actividades.id
      ORDER BY fecha_creacion DESC
    `,
        [search, search, search]
      );
    } else {
      [result] = await connection.query(`
      SELECT actividades.*, AVG(comentarios.voto) as votes
      FROM actividades
      LEFT JOIN comentarios ON actividades.id = comentarios.id_actividad
      GROUP BY actividades.id
      ORDER BY fecha_creacion DESC
    `);
    }

    if (result.length === 0) {
      // Si no hay resultados devolvemos una respuesta correcta pero sin datos
      res.send({
        status: "ok",
        data: "Sin resultados de búsqueda",
      });
    } else {
      // Si hay resultados tenemos que seleccionar las fotos de cada uno de los resultados

      // Extraigo los ids de las entradas del diario que acabo de seleccionar
      const ids = result.map((item) => item.id);

      // Creo un array vacío donde voy a guardar los resultados asociados a sus fotos
      let resultWithPhotos = [];

      // Selecciono todas las fotos que estén asociadas a alguna de las entradas del diario
      // tengo seleccionadas previamente
      const [photos] = await connection.query(`
        SELECT uploadedDate, imagen, id_actividad
        FROM imagenes
        WHERE id_actividad IN (${ids.join(",")})
      `);

      // LLeno el array vacío resultWithPhotos con la union de los arrays result y photos
      // Sólo cogiendo la primera foto
      resultWithPhotos = result.map((item) => {
        item.photo = photos.filter((photo) => photo.id_diary === item.id)[0];
        return item;
      });

      // Devuelvo el array
      res.send({
        status: "ok",
        data: resultWithPhotos,
      });
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { listEntries };
