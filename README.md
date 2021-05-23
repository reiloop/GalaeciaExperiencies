# ENDPOINTS

​

## Aplicación

​

- **GET** - [/experience] - Obtener la lista de experiencias.--->[John]V
- **GET** - [/experience/:idExperience] - Obtener la info de una experiencia.--->[John]V
- **GET** - [/experience/:idExperience/comments] - Obtener los comentarios de una experiencia.V

​

- **POST** - [/experience] - Insertar una nueva experiencia. **CON TOKEN**//SOLO ADMIN --->[JOSE]V
- **POST** - [/experience/:idExperience/comments] - Comentar y valorar una experiencia. **CON TOKEN**V

​

- **PUT** - [/experience/:idExperience] - Editar una experiencia. **CON TOKEN**//SOLO ADMIN ---->[JOSE]V
- **PUT** - [/experience/:idExperience/comments/:idComment] - Editar un comentario. **CON TOKEN**x
- **PUT** - [/experience/:idExperience/votes/:idRating] - Editar una valoración. **CON TOKEN**x
  ​
- **DELETE** - [/experience/:idExperience] - Eliminar una experiencia. **CON TOKEN** //SOLO ADMIN --->[JOSE]V
- **POST** - [/experience/:idExperience/photo] - Añadir una foto a una experiencia. **CON TOKEN**//SOLO ADMIN --->[JOSE]V
- **DELETE** - [/experience/:idExperience/photos/:idPhoto] - Eliminar una foto asignada a una experiencia. **CON TOKEN**//SOLO ADMIN ---->[JOSE]V
- **DELETE** - [/experience/:idExperience/comments/:idComment] - Eliminar un comentario. **CON TOKEN**x

​

## Users

- **GET** - [/users/activate/:regCode] - activar un usuario. -->[JOSE]V
- **GET** - [/users/:idUser] - Obtener info de usuario. **CON TOKEN**X
- **POST** - [/users] - Crea un usuario pendiente de activar. -->[JOSE]V
- **POST** - [/users/:idEvent] - Login de usuario.--->[JOSE]V
- **POST** - [/users/recovery] - Recuperar contraseña de usuario.X--->[John]V
- **POST** - [/users/reset] - Insertar nueva contraseña de usuario tras recuperación. X
- **PUT** - [/users/:idUser] - Editar datos de usuario. **CON TOKEN**X--->[John]V
- **PUT** - [/users/:idUser/password] - Editar contraseña. **CON TOKEN**X--->[John]V
- **DELETE** - [/users/:idUser] - Desactivar/Borrar usuario. **CON TOKEN**X--->[John]V
