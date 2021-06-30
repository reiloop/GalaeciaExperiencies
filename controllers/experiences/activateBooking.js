const { getConnection } = require("../../db");

async function activateBooking(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { bookingID } = req.params;

    //COMPROBAR QUE EXISTA USUARIO CON ESE CÓDIGO DE ACTIVACION
    let booking;

    try {
      [booking] = await connection.query(
        `
            SELECT *
            FROM reservas
            WHERE localizador = ?
            `,
        [bookingID]
      );
    } catch (error) {
      new Error("No se pudo comprobar coincidencias");
    }
    //SI NO EXISTE, LANZO ERROR
    if (booking.length < 1) {
      throw new Error(
        "no hay experiencia pendiente de valicación con ese código de registro"
      );
    }

    //ACTIVAR USUARIO
    try {
      await connection.query(
        `
            UPDATE reservas
            SET activada=true,
            WHERE localidador = ?
            `,
        [bookingID]
      );
    } catch (error) {
      throw new Error("no se pudo activar la reserva");
    }
    res.send({
      status: "ok",
      message: "La reserva fue activado correctamente",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { activateBooking };
