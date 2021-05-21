const { uploadImage } = require("../../helpers");
const { getConnection } = require("../../db");

async function editUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { nombre, email } = req.body;

    if (!email) {
      throw new Error("Obligatorio introducir el mail");
    }

    if (req.files) {
      //GESTIONAR SUBIDA DE IMAGENES
      let nameFile;
      try {
        nameFile = await uploadImage({
          file: req.files.picture,
          directory: "avatares",
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
                email=?,
                foto=?
                WHERE id=?
                `,
          [nombre, email, nameFile, req.auth.id]
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
                email=?
                WHERE id=?
                `,
          [nombre, email, req.auth.id]
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
