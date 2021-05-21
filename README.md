# ENDPOINTS

​

## Aplicación

​

- **GET** - [/experience] - Obtener la lista de experiencias.--->[John]
- **GET** - [/experience/:idExperience] - Obtener la info de una experiencia.--->[John]
- **GET** - [/experience/:idExperience/comments] - Obtener los comentarios de una experiencia.

​

- **POST** - [/experience] - Insertar una nueva experiencia. **CON TOKEN**//SOLO ADMIN --->[JOSE]V
- **POST** - [/experience/:idExperience/comments] - Comentar una experiencia. **CON TOKEN**
- **POST** - [/experience/:idExperience/votes] - Valorar una experiencia. **CON TOKEN**

​

- **PUT** - [/experience/:idExperience] - Editar una experiencia. **CON TOKEN**//SOLO ADMIN ---->[JOSE]
- **PUT** - [/experience/:idExperience/comments/:idComment] - Editar un comentario. **CON TOKEN**
- **PUT** - [/experience/:idExperience/votes/:idRating] - Editar una valoración. **CON TOKEN**
  ​
- **DELETE** - [/experience/:idExperience] - Eliminar una experiencia. **CON TOKEN** //SOLO ADMIN --->[JOSE]
- **DELETE** - [/experience/:idExperience/photos/:idPhoto] - Eliminar una foto asignada a una experiencia. **CON TOKEN**//SOLO ADMIN ---->[JOSE]
- **DELETE** - [/experience/:idExperience/comments/:idComment] - Eliminar un comentario. **CON TOKEN**

​

## Users

​

- **GET** - [/users/activate/:regCode] - activar un usuario. -->[JOSE]V
- **GET** - [/users/:idUser] - Obtener info de usuario. **CON TOKEN**X
- **POST** - [/users] - Crea un usuario pendiente de activar. -->[JOSE]V
- **POST** - [/users/:idEvent] - Login de usuario.--->[JOSE]V
- **POST** - [/users/recovery] - Recuperar contraseña de usuario.X--->[John]
- **POST** - [/users/reset] - Insertar nueva contraseña de usuario tras recuperación. X
- **PUT** - [/users/:idUser] - Editar datos de usuario. **CON TOKEN**X--->[John]
- **PUT** - [/users/:idUser/password] - Editar contraseña. **CON TOKEN**X--->[John]
- **DELETE** - [/users/:idUser] - Desactivar/Borrar usuario. **CON TOKEN**X--->[John]
