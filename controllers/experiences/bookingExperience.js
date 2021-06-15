const { getConnection } = require("../../db");
const { v4: uuidv4 } = require("uuid");
const bookingID = uuidv4();

async function bookingExperience(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de la entrada del diario de req.params
    const { id, userID } = req.params;

    // Compruebo que la entrada que queremos reservar está disponible
    const [disponible] = await connection.query(
      `
      SELECT  actividades.plazas_disponibles
      FROM actividades
      WHERE actividades.id=?
    `,
      [id]
    );
    if (disponible.lenght < 1) {
      throw new Error("No existen plazas disponibles para esta actividad");
    }

    // Compruebo que el usuario del token no reservó previamente esta actividad

    // Actualizar base de datos con la reserva
    const { fecha_uso, precio } = req.body;
    await connection.query(
      `
        INSERT INTO reservas(localizador, fecha_creacion, precio, fecha_uso, id_user, id_actividad)
        VALUES(?,?,?,?,?,?)
      `,
      [bookingID, new Date(), precio, fecha_uso, userID, id]
    );

    // Doy una respuesta
    res.send({
      status: "ok",
      message: `Reservaste correctamente la entrada con id ${id} tu número de reserva es ${bookingID}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { bookingExperience };
