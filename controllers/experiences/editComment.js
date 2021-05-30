const { getConnection } = require("../../db");

async function editComment(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de los parámetros
    const { id, idActividad } = req.params;
    const { vote, comentario } = req.body;

    //compruebo que el id coincide con el req.auth.id
    if (Number(req.auth.id) !== Number(id)) {
        throw new Error(`No puedes cambiar los comentarios de otro ususario`);
      }

    // Actualizo el comentario que coincide con el id
    try {
    await connection.query(
      `
      UPDATE comentarios
      SET voto=?, comentario=?
      WHERE id_actividad=? AND id_user=?
    `,
      [vote, comentario, idActividad, id]
      );

    }catch (error) {
          throw new Error("No se pudo modificar el comentario")
    }


    // Devuelvo los datos
    res.send({
      status: "ok",
      message: "Comentario actualizado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  editComment,
};