const { getConnection } = require("./db");
const bcrypt = require("bcrypt");

async function main() {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(`SET FOREIGN_KEY_CHECKS = 0`);
    await connection.query(`DROP TABLE IF EXISTS usuarios`);
    await connection.query(`DROP TABLE IF EXISTS actividades`);
    await connection.query(`DROP TABLE IF EXISTS reservas`);
    await connection.query(`DROP TABLE IF EXISTS usuarios_reservas`);
    await connection.query(`DROP TABLE IF EXISTS comentarios`);
    await connection.query(`DROP TABLE IF EXISTS imagenes`);
    await connection.query(`SET FOREIGN_KEY_CHECKS = 1`);

    await connection.query(`
    CREATE TABLE usuarios (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        registrationDate DATETIME NOT NULL,
        nombre VARCHAR(20) NOT NULL,
        apellidos VARCHAR(50),
        email VARCHAR(100) NOT NULL UNIQUE,
        contrasena TINYTEXT NOT NULL,
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
        precio DECIMAL(5,2)
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
        fecha_creacion_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id_usuario INT UNSIGNED,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
        id_reserva INT UNSIGNED,
        FOREIGN KEY (id_reserva) REFERENCES reservas(id)
        )`);

    console.log("tablas creadas actividades");

    await connection.query(`
    CREATE TABLE usuarios_reservas(
        id_usuario INT UNSIGNED,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
        id_reserva INT UNSIGNED,
        FOREIGN KEY (id_reserva) REFERENCES reservas(id),
        PRIMARY KEY (id_usuario, id_reserva)
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
        id_usuario INT UNSIGNED,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
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
        FOREIGN KEY (id_actividad) REFERENCES actividades (id)
        )
         `);

    console.log("tablas creadas imagenes");

    const password = await bcrypt.hash("123456789", 10);

    await connection.query(`
        INSERT INTO usuarios(
            registrationDate,
            email,
            nombre,
            contrasena, 
            rol,
            activado,
            lastUpdate,
            lastAuthUpdate 
        )
        VALUES(
            UTC_TIMESTAMP,
            "jose.reimondez@hotmail.com",
            "administrador",
            "${password}",
            "admin",
            true,
            UTC_TIMESTAMP,
            UTC_TIMESTAMP
        )
        `);

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
