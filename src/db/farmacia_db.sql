-- SQLBook: Code

CREATE TABLE
    usuarios (
        id int AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        nombre VARCHAR(70) NOT NULL,
        apellido VARCHAR(70) NOT NULL,
        photo VARCHAR(255) NOT NULL,
        estado TINYINT(1) NOT NULL
    );

CREATE TABLE
    roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rol VARCHAR(50),
        estado TINYINT(1)
    );

CREATE TABLE
    usuario_roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_usuario INT NOT NULL,
        id_rol INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
        FOREIGN KEY (id_rol) REFERENCES roles(id)
    );

CREATE TABLE
    SysMenu (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        nombreMenu VARCHAR(50) NULL,
        padreId INT NOT NULL,
        posicion INT,
        ruta VARCHAR(100),
        icono VARCHAR(100) NULL,
        Habilitado TINYINT(1)
    );

CREATE TABLE
    Rol_Sys_Menu (
        Id_Menu INT NOT NULL,
        Id_Rol INT NOT NULL,
        FOREIGN KEY (Id_Menu) REFERENCES SysMenu(Id),
        FOREIGN KEY (Id_Rol) REFERENCES roles(id)
    );

DELIMITER //

CREATE PROCEDURE sp_Mostrar_Datos_Usuario(
    IN username_param VARCHAR(100)
)
BEGIN
    -- Consulta para obtener los datos del usuario y su rol, incluyendo 'photo' buscando por nombre de usuario
    SELECT U.id, U.username, U.password, U.nombre, U.apellido, U.photo, U.estado, R.rol, R.id AS id_rol
    FROM usuarios U
    INNER JOIN usuario_roles UR ON U.id = UR.id_usuario
    INNER JOIN roles R ON UR.id_rol = R.id
    WHERE U.username = usern	ame_param;
END;
//

DELIMITER ; 

DELIMITER //

CREATE PROCEDURE SP_INSERTAR_USUARIO_ROL(IN USERNAME_PARAM 
VARCHAR(100), IN PASSWORD_PARAM VARCHAR(255), IN NOMBRE_PARAM 
VARCHAR(70), IN APELLIDO_PARAM VARCHAR(70), IN PHOTO_PARAM 
VARCHAR(255), IN ROL_PARAM VARCHAR(50)) BEGIN DECLARE 
	DECLARE usuario_id INT;
	-- Insertar un nuevo usuario en la tabla usuarios
	INSERT INTO
	    usuarios (
	        username,
	        password,
	        nombre,
	        apellido,
	        photo,
	        estado
	    )
	VALUES (
	        username_param,
	        password_param,
	        nombre_param,
	        apellido_param,
	        photo_param,
	        1
	    );
	-- Obtener el ID del usuario insertado
	SET usuario_id = LAST_INSERT_ID();
	-- Insertar la relación usuario-rol en la tabla usuario_roles
	INSERT INTO
	    usuario_roles (id_usuario, id_rol)
	VALUES (usuario_id, rol_param);
	END;


//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE SP_ACTUALIZAR_USUARIO_ROLES(IN USERNAME_PARAM 
VARCHAR(100), IN PASSWORD_PARAM VARCHAR(255), IN NOMBRE_PARAM 
VARCHAR(70), IN APELLIDO_PARAM VARCHAR(70), IN PHOTO_PARAM 
VARCHAR(255), IN ROL_ID_PARAM INT) BEGIN 
-- ACTUALIZAR LOS DATOS DEL USUARIO, EXCLUYENDO EL CAMPO 'ESTADO' 
	-- Actualizar los datos del usuario, excluyendo el campo 'estado'
	UPDATE usuarios
	SET password
	    = password_param,
	    nombre = nombre_param,
	    apellido = apellido_param,
	    photo = photo_param
	WHERE
	    username = username_param;
	-- Actualizar el rol del usuario en la tabla usuario_roles
	UPDATE usuario_roles
	SET id_rol = rol_id_param
	WHERE id_usuario = (
	        SELECT id
	        FROM usuarios
	        WHERE
	            username = username_param
	    );
	COMMIT;
	END;


//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE SP_ELIMINAR_USUARIO(IN USERNAME_PARAM 
VARCHAR(100)) BEGIN 
-- ACTUALIZAR EL ESTADO DEL USUARIO A 0 (BORRADO LÓGICO) POR NOMBRE DE USUARIO 
	-- Actualizar el estado del usuario a 0 (borrado lógico) por nombre de usuario
	UPDATE usuarios
	SET estado = 0
	WHERE
	    username = username_param;
	COMMIT;
	END;


//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE SP_VALIDARUSERNAMEEXISTENTE(IN USERNAME_PARAM 
VARCHAR(100), OUT USERNAME_EXISTENTE TINYINT) BEGIN 
DECLARE 
	DECLARE username_count INT;
	-- Verificar si el nombre de usuario existe
	SELECT
	    COUNT(*) INTO username_count
	FROM usuarios
	WHERE username = username_param;
	SET username_existente = IF(username_count > 0, 1, 0);
	END// 


DELIMITER ;

DELIMITER //

CREATE PROCEDURE SP_MOSTRAR_MENUS_ROL(IN IDROL INT) 
BEGIN -- CONSULTA PARA OBTENER LOS MENÚS SELECCIONADOS POR EL ROL CON PADREID IGUAL A 0 
	-- Consulta para obtener los menús seleccionados por el rol con PadreId igual a 0
	SELECT
	    RS.Id_Menu,
	    SM.nombreMenu,
	    SM.padreId,
	    SM.posicion,
	    SM.ruta,
	    SM.icono,
	    SM.Habilitado
	FROM Rol_Sys_Menu RS
	    INNER JOIN SysMenu SM ON RS.Id_Menu = SM.Id
	WHERE
	    RS.Id_Rol = idRol
	    AND SM.padreId = 0
	ORDER BY SM.posicion ASC;
	END// 


DELIMITER ;

DELIMITER //

CREATE PROCEDURE SP_MOSTRAR_SUBMENUS_ROL(IN IDROL INT
) BEGIN -- CONSULTA PARA OBTENER LOS SUBMENÚS SELECCIONADOS POR EL ROL CON PADREID DIFERENTE DE 0 
	-- Consulta para obtener los submenús seleccionados por el rol con PadreId diferente de 0
	SELECT
	    RS.Id_Menu,
	    SM.nombreMenu,
	    SM.padreId,
	    SM.posicion,
	    SM.ruta,
	    SM.icono,
	    SM.Habilitado
	FROM Rol_Sys_Menu RS
	    INNER JOIN SysMenu SM ON RS.Id_Menu = SM.Id
	WHERE
	    RS.Id_Rol = idRol
	    AND SM.padreId <> 0
	ORDER BY SM.posicion ASC;
	END// 


DELIMITER ;
-- SQLBook: Code
