import db from "../config/db.js"

const Rol = {}

Rol.gestionar_rol = ( option, rol, menu, rolId ) => {
    const sql = `
    CALL
        sp_Gestion_Roles(?,?,?,?,?)
    `

    return db.query(sql, [option, menu, rolId, rol.name, rol.estado])
}


Rol.getRoles = () => {
    const sql = `
    CALL 
        sp_GetRoles
    `
    return db.query(sql).then(([rows]) => {
        const roles = rows.map(row => ({
            id: row.id,
            rol: row.rol,
            estado: row.activo,    
        }));
        return roles;
    });
}

Rol.getRoles_Activos = () => {
    const sql = `
    CALL 
        sp_GetRoles_activo
    `
    return db.query(sql).then(([rows]) => {
        const roles = rows.map(row => ({
            id: row.id,
            rol: row.rol,
        }));
        return roles;
    });
}

export default Rol