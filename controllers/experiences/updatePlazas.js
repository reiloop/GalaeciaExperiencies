const { getConnection } = require("../../db");

async function updatePlazas(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    // Comprobamos que en el body vienen todos los datos necesarios
    const {  plazasLibres } = req.body;
    const libres = plazasLibres - 1;
    if (libres === 0){
        res.send({
            status: "ok",
            message: `No quedan plazas libres`,
          });
      
    }else{
        // Actualizamos la entrada
        await connection.query(
          `
          UPDATE actividades
          SET plazas_disponibles=?
          WHERE id=?
        `,
          [
            libres,
            id,
      
          ]
        );
    
        // devolvemos una respuesta
    
        res.send({
          status: "ok",
          message: `Se han actualizado las plazas disponibles`,
        });

    }

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { updatePlazas };
