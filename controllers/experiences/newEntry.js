const { getConnection } = require("../../db");

async function newEntry(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // compruebo que recibo los datos necesarios (place)
    const {
      availableDate,
      description,
      name,
      place,
      price,
      plazasLibres,
      plazasTotales,
    } = req.body;

    if (!place) {
      throw new Error('Por lo menos debes incluír el campo "place"');
    }
    fecha_disponible = new Date(availableDate);
    // Meto la entrada en la base de datos
    const [result] = await connection.query(
      `
      INSERT INTO actividades(fecha_disponible, descripcion, nombre, localidad, precio, plazas_disponibles,  plazas_totales, lastUpdate ,id_user)
      VALUES(?,?,?,?,?,?,?,?,?)
    `,
      [
        fecha_disponible,
        description,
        name,
        place,
        price,
        plazasLibres,
        plazasTotales,
        new Date(),
        req.auth.id,
      ]
    );

    // Devuelvo información
    res.send({
      status: "ok",
      message: "Nueva entrada añadida",
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { newEntry };
