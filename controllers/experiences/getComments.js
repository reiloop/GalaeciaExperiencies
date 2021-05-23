const { getConnection } = require("../../db");

async function getComments(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de los parámetros
    const { id } = req.params;

    // Ejecuto la consulta
    const [result] = await connection.query(
      `
      SELECT comentarios.id, comentarios.fecha, comentarios.voto, comentarios.comentario, users.nombre, users.id AS userid, AVG(comentarios.voto) as votes
      FROM comentarios
      LEFT JOIN users ON comentarios.id_user = users.id
      LEFT JOIN comentarios ON actividades.id = comentarios.id_actividad
      WHERE actividades.id=?
    `,
      [id]
    );

    if (result.length < 1) {
      throw new Error("La entrada no existe");
    }

    const data = result[0];

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
  getComments,
};
