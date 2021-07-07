const { uploadImage } = require("../../helpers");
const { getConnection } = require("../../db");

async function editUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { nombre, bio } = req.body;

    if (!nombre) {
      throw new Error("Obligatorio introducir al menos el nombre");
    }

    if (req.files) {
      //GESTIONAR SUBIDA DE IMAGENES
      let nameFile;
      try {
        nameFile = await uploadImage({
          file: req.files.picture,
          directory: "uploads",
        });
      } catch (error) {
        console.log(error);
        throw new Error("No se ha podido subir la imagen");
      }

      //ACTUALIZO EL USUARIO
      try {
        await connection.query(
          `
                UPDATE users
                SET nombre=?,
                foto=?
                biografia=?
                WHERE id=?
                `,
          [nombre, nameFile, bio, req.auth.id]
        );
      } catch (error) {
        throw new Error("Error al actualizar tu usuario");
      }
    } else {
      try {
        await connection.query(
          `
                UPDATE users
                SET nombre=?,
                biografia=?
                WHERE id=?
                `,
          [nombre, bio, req.auth.id]
        );
      } catch (error) {
        throw new Error("Error al actualizar tu usuario");
      }
    }
    res.send("Tu usuario ha sido actualizado satisfactoriamente");
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { editUser };
