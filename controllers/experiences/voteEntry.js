const { getConnection } = require("../../db");

async function voteEntry(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de la entrada del diario de req.params
    const { idExperience } = req.params;

    // Saco los votos de req.body
    const { vote, comentario } = req.body;

    // Compruebo que los votos tienen un valor correcto
    const validVotes = [1, 2, 3, 4, 5];

    if (!validVotes.includes(vote)) {
      throw new Error("Voto incorrecto");
    }

    // Compruebo que la entrada que queremos votar existe

    const [result] = await connection.query(
      `
      SELECT * 
      FROM actividades
      WHERE id=?
    `,
      [idExperience]
    );

    if (result.length < 1) {
      throw new Error("La experiencia que quieres votar no existe");
    }

    // Compruebo que el usuario del token no voto previamente la entrada
    const [existingVote] = await connection.query(
      `
      SELECT *
      FROM comentarios
      WHERE id_user=? AND id_actividad=?
    `,
      [req.auth.id, idExperience]
    );

    if (existingVote.length > 0) {
      throw new Error("Ya votaste a esta entrada");
    }

    // Añado el voto a la tabla
    await connection.query(
      `
      INSERT INTO comentarios(comentario, voto, fecha, id_user, id_actividad)
      VALUES(?,?,?,?,?)
    `,
      [comentario, vote, new Date(), req.auth.id, idExperience]
    );

    // Calculo la media de votos resultante
    const [votes] = await connection.query(
      `
      SELECT AVG(voto) AS average
      FROM comentarios
      WHERE id_actividad=?
    `,
      [idExperience]
    );

    // Doy una respuesta
    res.send({
      status: "ok",
      message: `Votaste correctamente la entrada con id ${idExperience} la media actual es de ${votes[0].average}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { voteEntry };
