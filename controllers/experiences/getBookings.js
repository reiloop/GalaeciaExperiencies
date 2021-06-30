const { getConnection } = require("../../db");

async function getBookings(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de los parámetros
    const { id } = req.params;

    // Ejecuto la consulta
    const [result] = await connection.query(
      `
      SELECT *
      FROM reservas R
      LEFT JOIN actividades A ON R.id_actividad = A.id
      WHERE R.id_user=?

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
  getBookings,
};
