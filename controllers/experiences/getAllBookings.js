const { getConnection } = require("../../db");

async function getAllBookings(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de los parámetros

    // Ejecuto la consulta
    const [result] = await connection.query(
      `
      SELECT A.id, fecha_uso,  A.nombre AS "nombre_actividad", U.nombre AS "nombre_usuario"
      FROM reservas
      LEFT JOIN users U ON reservas.id_user = U.id
      LEFT JOIN actividades A ON reservas.id_actividad = A.id

    `
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
  getAllBookings,
};
