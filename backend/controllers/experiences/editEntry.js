const { getConnection } = require("../../db");

async function editEntry(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    // Comprobamos que en el body vienen todos los datos necesarios
    const { name, categoria, availableDate, place, description, price, plazasLibres, plazasTotales,} = req.body;

    // Actualizamos la entrada
    await connection.query(
      `
      UPDATE actividades
      SET localidad=?, descripcion=?, lastUpdate=?, precio=?, nombre=?, categoria=?, fecha_disponible=?, plazas_disponibles=?, plazas_totales=?
      WHERE id=?
    `,
      [
        place,
        description,
        new Date(),
        price,
        name,
        categoria,
        availableDate,
        plazasLibres,
        plazasTotales,
        id,
  
      ]
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
