import db from "../config/db.js"

const Usuario = {}

Usuario.obtener_Usuarios_Rol = (usuario) => {
    const sql = `
    CALL 
        sp_mostrar_Usuarios_Rol
    `
    return db.query(sql).then(([rows]) => {
        const usuarioRoles = rows.map(row => ({
            id: row.usuario_id,
            username: row.usuario_username,
            password: row.usuario_password,
            nombre: row.usuario_nombre,
            apellido: row.usuario_apellido,
            photo: row.usuario_photo,
            estado: row.usuario_estado,
            rol: row.rol_nombre,
            id_rol: row.rol_id           
        }));
        return usuarioRoles;
    });
}

Usuario.validar_Username_Existente = async (usuario) => {
    const sql = `
    CALL 
        sp_Validar_Username_Existente
        (?, @result_user)
    `
    await db.query(sql, [usuario.username]);

    const sql2 = `SELECT @result_user AS result_user;`
    const rows = await db.query(sql2);
    
    const resultUsername = rows[0].result_user;
    return resultUsername;
}


Usuario.gestionar_usuario = (usuario, opcion) => {
    //insert(1) update(2) delete(3)
    const sql3 = `
    CALL 
        sp_Gestionar_Usuario
        (?, ?, ?, ?, ?, ?, ?, ?)
    `
    return db.query(sql3, [
        opcion,
        usuario.username,
        usuario.password,
        usuario.nombre,
        usuario.apellido,
        usuario.photo,
        usuario.estado,
        usuario.id_rol
    ])
}


Usuario.obtener_Usuario_Auth = (username) => {

    const sql = `CALL 
    sp_Mostrar_Datos_Usuario
        (?)
    `
    return db.query(sql, [
        username
    ])
}

Usuario.obtener_Password_Usuario = (username) => {

    const sql = `CALL 
    sp_Validar_Password_Nueva
        (?)
    `
    return db.query(sql, [
        username
    ])
}

export default Usuario