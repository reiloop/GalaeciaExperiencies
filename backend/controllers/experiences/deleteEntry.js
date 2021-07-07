const { getConnection } = require("../../db");

async function deleteEntry(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    //sacamos la id de la entrada que queremos borrar
    const { id } = req.params;

    // borramos la entrada
    await connection.query(
      `
      DELETE FROM actividades
      WHERE id=?
    `,
      [id]
    );

    // devolvemos una respuesta
    res.send({
      status: "ok",
      message: `La entrada con id ${id} fue borrada`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { deleteEntry };
