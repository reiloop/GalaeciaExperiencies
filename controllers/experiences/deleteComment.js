const { getConnection } = require("../../db");

async function deleteComment(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de los parámetros
    const { id, idActividad } = req.params;

    //compruebo que el id coincide con el req.auth.id
    if (Number(req.auth.id) !== Number(id)) {
        throw new Error(`No puedes borrar los comentarios de otro ususario`);
      }

    // Borro el comentario que coincide con el id
    try {
    await connection.query(
      `
      DELETE 
      FROM comentarios
      WHERE id_actividad=? AND id_user=?
    `,
      [idActividad, id]
      );

    }catch (error) {
          throw new Error("No se pudeo borrar el comentario")
    }


    // Devuelvo los datos
    res.send({
      status: "ok",
      message: "Comentario borrado",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  deleteComment,
};