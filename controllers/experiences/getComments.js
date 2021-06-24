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
      SELECT *
      FROM comentarios
      WHERE id_actividad=?
    `,
      [id]
    );

    if (result.length < 1) {
      throw new Error("La entrada no existe");
    }

    const data = result;

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
