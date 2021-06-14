const { getConnection } = require("../../db");

async function reserveExperience(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de la entrada del diario de req.params
    const { idExperience, price } = req.params;

    // Compruebo que la entrada que queremos reservar está disponible

    // Compruebo que el usuario del token no reservó previamente esta actividad

    // Actualizar base de datos con la reserva
    await connection.query(
      `
        INSERT INTO reservas(id, fecha_creación, fecha_uso, precio)
        VALUES(?,?,?,?,?)
      `,
      [comentario, new Date(), new Date(), price]
    );

    // Doy una respuesta
    res.send({
      status: "ok",
      message: `Reservaste correctamente la entrada con id ${idExperience} tu número de resercva es ${idReserva}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { reserveExperience };
