const { getConnection } = require("../../db");

async function getEntry(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    // Saco la id de los parámetros
    const { id } = req.params;

    // Ejecuto la consulta
    const [result] = await connection.query(
      `
      SELECT diary.id, diary.date, diary.description, diary.place, users.name, users.id AS userid, AVG(diary_votes.vote) as votes
      FROM diary
      LEFT JOIN users ON diary.id_user = users.id
      LEFT JOIN diary_votes ON diary.id = diary_votes.id_diary
      WHERE diary.id=?
    `,
      [id]
    );

    if (result.length < 1) {
      throw new Error("La entrada no existe");
    }

    const data = result[0];

    // Saco de la base de datos las fotos asociadas a esta entrada

    const [photos] = await connection.query(
      `
      SELECT uploadedDate, image
      FROM diary_images
      WHERE id_diary=?
    `,
      [id]
    );

    data.photos = photos;

    // Devuelvo los datos
    res.send({
      status: "ok",
      data: data,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  getEntry,
};
