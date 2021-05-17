const { getConnection } = require("../../db");

async function editEntry(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    // Comprobamos que en el body vienen todos los datos necesarios
    const { place, description } = req.body;

    // Actualizamos la entrada
    await connection.query(
      `
      UPDATE diary
      SET place=?, description=?, lastUpdate=?
      WHERE id=?
    `,
      [place, description, new Date(), id]
    );

    // devolvemos una respuesta

    res.send({
      status: "ok",
      message: `La entrada con id ${id} fue actualizada`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editEntry };
