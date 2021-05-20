//REQUERIMOS MODULOS Y DATOS PARA ARRANCAR EL SERVIDOR
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT;

//OBTENEMOS CONTROLADORES PARA LOS DISTINTOS MÉTODOS
// Y FUNCIONALIDADES

// Controladores de usuario
const { createUser } = require("./controllers/users/createUser");
const { activateUser } = require("./controllers/users/activateUser");
const { getUser } = require("./controllers/users/getUser");
const { login } = require("./controllers/users/login");
const { editUser } = require("./controllers/users/editUser");
const { deleteUser } = require("./controllers/users/deleteUser");
const { recover } = require("./controllers/users/recover");
const { resetPassword } = require("./controllers/users/resetPassword");
const { editPassword } = require("./controllers/users/editPassword");

// Controladores de diario
const { newEntry } = require("./controllers/experiences/newEntry");
const { editEntry } = require("./controllers/experiences/editEntry");
const { getEntry } = require("./controllers/experiences/getEntry");
const { deleteEntry } = require("./controllers/experiences/deleteEntry");
const { listEntries } = require("./controllers/experiences/listEntries");
const { addEntryPhoto } = require("./controllers/experiences/addEntryPhoto");
const {
  deleteEntryPhoto,
} = require("./controllers/experiences/deleteEntryPhoto");
const { voteEntry } = require("./controllers/experiences/voteEntry");

//OBTENEMOS MIDDLEWARES PARA LA PREVIA DE LOS
// DISTINTOS MÉTODOS Y FUNCIONALIDADES
const { validAuth } = require("./middlewares/validAuth");
const { isSameUser } = require("./middlewares/isSameUser");
const { isAdmin } = require("./middlewares/isAdmin");
const { canEdit } = require("./middlewares/canEdit");

//APLICAMOS MIDDLEWARES GENERALES DE USO
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(fileUpload());

//APLICAMOS MIDDLEWARES ENDPOINTS
//CREAR USUARIO
app.post("/users", createUser);

// //ACTIVACIÓN DE USUARIO
app.get("/activate/:registrationCode", activateUser);

// //LOGIN
// app.post("/login", login);

// //GET PERFIL USUARIO
// app.get("/user/:id", validAuth, getUser);

// //EDITAR PERFIL USUARIO
// app.put("/user/:id", validAuth, isSameUser, editUser);

// //EDITAR PASSWORD
// app.put("/user/password/:id", validAuth, isSameUser, editPassword);

// //BORRAR PERFIL USUARIO
// app.delete("/user/:id", validAuth, isAdmin, deleteUser);

// //RECORDAR CONTRASEÑA
// app.put("/recoverPassword", recover);

// //RESETEAR CONTRASEÑA
// app.put("/reset/:code", resetPassword);

// /*
//   CONTROLADORES DE DIARIO
// */

// //CREAR ENTRADA EN EL DIARIO
// app.post("/diary", validAuth, newEntry);

// //EDITAR LA ENTRADA DEL DIARIO
// app.put("/diary/:id", validAuth, canEdit, editEntry);

// //VER UNA DETERMINADA ENTRADA DEL DIARIO
// app.get("/diary/:id", getEntry);

// //BORRAR UNA ENTRADA DEL DIARIO
// app.delete("/diary/:id", validAuth, canEdit, deleteEntry);

// //LISTAR ENTRADAS DEL DIARIO
// app.get("/diary", listEntries);

// // ADJUNTAR FOTOS A UNA ENTRADA
// app.post("/diary/:id/photos", validAuth, canEdit, addEntryPhoto);

// // BORRAR FOTOS DE UNA ENTRADA
// app.delete("/diary/:id/photos/:photoID", validAuth, canEdit, deleteEntryPhoto);

// // VOTAR UNA ENTRADA DEL DIARIO
// app.post("/diary/:id/votes", validAuth, voteEntry);

//MIDDLEWARE DE GESTION DE ERRORES
app.use(function (error, req, res, next) {
  if (error) {
    res.status(error.httpStatus || 500).send({ error: error.message });
  }
});

//MIDDLEWARE DE GESTIÓN DE RUTA NO ENCONTRADA
app.use(function (req, res) {
  res.send("No se ha encontrado la ruta");
});

app.listen(port, () => {
  console.log(`Servidor oficial funcionando en el puerto ${port}`);
});
