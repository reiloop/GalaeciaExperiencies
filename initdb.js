const { getConnection } = require("./db");
const bcrypt = require("bcrypt");

async function main() {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await connection.query(`DROP TABLE IF EXISTS users`);
    await connection.query(`DROP TABLE IF EXISTS actividades`);
    await connection.query(`DROP TABLE IF EXISTS reservas`);
    await connection.query(`DROP TABLE IF EXISTS usuarios_reservas`);
    await connection.query(`DROP TABLE IF EXISTS comentarios`);
    await connection.query(`DROP TABLE IF EXISTS imagenes`);

    await connection.query(`
    CREATE TABLE users(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        registrationDate DATETIME NOT NULL,
        nombre VARCHAR(20) NOT NULL,
        apellidos VARCHAR(50),
        email VARCHAR(100) NOT NULL UNIQUE,
        password TINYTEXT NOT NULL,
        rol ENUM("user", "admin") DEFAULT "user" NOT NULL,
        biografia TINYTEXT,
        foto TINYTEXT,
        activado BOOLEAN DEFAULT false,
        registrationCode TINYTEXT,
        passwordUpdateCode TINYTEXT,
        lastUpdate DATETIME NOT NULL,
        lastAuthUpdate DATETIME NOT NULL
        )
        `);

    console.log("tablas creadas users");

    await connection.query(`
    CREATE TABLE reservas(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_uso DATETIME,
<<<<<<< HEAD
        precio DECIMAL(5,2),
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users(id),
        id_actividad INT UNSIGNED,
        FOREIGN KEY (id_actividad) REFERENCES actividades(id)
=======
        precio DECIMAL(5,2)
>>>>>>> 31094ce5c11cb32d5f1596926f1a0af161b7cfab
        )
        `);

    console.log("tablas creadas reservas");

    await connection.query(`
    CREATE TABLE actividades(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(20) NOT NULL,
        descripcion TEXT,
        localidad VARCHAR(50) NOT NULL,
        categoria ENUM("cursos", "actividades"),
        disponible BOOLEAN,
        precio DECIMAL(5,2),
        fecha_disponible DATETIME,
        plazas_disponibles INT,
        plazas_totales INT,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_creacion_reserva DATETIME,
        lastUpdate DATETIME NOT NULL,
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users(id),
        )`);

    console.log("tablas creadas actividades");

    await connection.query(`
    CREATE TABLE usuarios_reservas(
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users(id),
        id_reserva INT UNSIGNED,
        FOREIGN KEY (id_reserva) REFERENCES reservas(id),
        PRIMARY KEY (id_user, id_reserva)
        )   
        `);

    console.log("tablas creadas usuarios_reservas");

    await connection.query(`
    CREATE TABLE comentarios(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        fecha DATETIME NOT NULL,
        voto TINYINT NOT NULL,
        comentario TINYTEXT,
        imagen TINYTEXT,
        id_user INT UNSIGNED,
        FOREIGN KEY (id_user) REFERENCES users(id),
        id_actividad INT UNSIGNED,
        FOREIGN KEY (id_actividad) REFERENCES actividades(id)
)  
        `);

    console.log("tablas creadas comentarios");

    await connection.query(`
    CREATE TABLE imagenes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        uploadedDate DATETIME NOT NULL,
        imagen TINYTEXT,
        id_actividad INT UNSIGNED,
        FOREIGN KEY (id_actividad) REFERENCES actividades(id)
        )
         `);

    console.log("tablas creadas imagenes");

    const password = await bcrypt.hash("admin", 10);

    await connection.query(`
        INSERT INTO users(
            registrationDate,
            email,
            nombre,
            password, 
            rol,
            activado,
            lastUpdate,
            lastAuthUpdate 
        )
        VALUES(
            UTC_TIMESTAMP,
<<<<<<< HEAD
            "admin@yomismo.com",
=======
            "lanihel409@sc2hub.com",
>>>>>>> 31094ce5c11cb32d5f1596926f1a0af161b7cfab
            "administrador",
            "${password}",
            "admin",
            true,
            UTC_TIMESTAMP,
            UTC_TIMESTAMP
        )
        `);
    await connection.query(`SET FOREIGN_KEY_CHECKS = 1`);
    // const users = 50;
    // for (let i = 0; i < users; i++) {
    //   const email = faker.internet.email();
    //   const name = faker.name.findName();
    //   await connection.query(`
    //         INSERT INTO users(
    //             registrationDate,
    //             email,
    //             contrasena,
    //             nombre,
    //             lastUpdate,
    //             lastAuthUpdate
    //             )
    //         VALUES(
    //             UTC_TIMESTAMP,
    //             "${email}",
    //             123456789,
    //             "${name}",
    //             UTC_TIMESTAMP,
    //             UTC_TIMESTAMP
    //             )`);
    // }

    // console.log("usuarios creados");

    // for (let i = 1; i <= 50; i++) {
    //   const description = faker.commerce.productDescription();
    //   const place = faker.address.city();
    //   await connection.query(`
    //         INSERT INTO actividades(
    //             fecha_disponible,
    //             descripcion,
    //             localidad,
    //             id_user
    //             )
    //         VALUES(
    //             UTC_TIMESTAMP,
    //             "${description}",
    //             "${place}",
    //             ${i}
    //         )
    //         `);
    // }
    // console.log("entradas diario creadas");

    // const entries = 200;
    // for (let i = 1; i <= entries; i++) {
    //   const vote = random(1, 5);
    //   const idEntrada = random(1, users);
    //   const idUsuario = random(2, users);
    //   await connection.query(`
    //             INSERT INTO comentarios(
    //                 fecha,
    //                 voto,
    //                 id_user ,
    //                 id_actividad
    //                 )
    //             VALUES(
    //                 UTC_TIMESTAMP,
    //                 "${vote}",
    //                 "${idUsuario}",
    //                 "${idEntrada}"
    //                 )
    //         `);
    // }
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log("Todo leído, liberando conexión");
    if (connection) connection.release();
    process.exit();
  }
}

main();
