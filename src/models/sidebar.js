import db from "../config/db.js"

const Sidebar = {}

Sidebar.obtenerMenuPadre = (usuario) => {
    const sql = `
    CALL 
        sp_Mostrar_Menus_Rol
        (?)
    `
    return db.query(sql, [
        usuario.rol
    ]).then(([rows]) => {
        const menuPadre = rows.map(row => ({
            id: row.Id_Menu,
            nombre: row.nombreMenu,
            padreId: row.padreId,
            posicion: row.posicion,
            ruta: row.ruta,
            icono: row.icono,
            Habilitado: row.Habilitado
        }));
        return menuPadre;
    });
}

Sidebar.obtenerMenuHijo = (usuario) => {
    const sql = `
    CALL 
    sp_Mostrar_SubMenus_Rol
        (?)
    `
    return db.query(sql, [
        usuario.rol
    ]).then(([rows]) => {
        const menuHijo = rows.map(row => ({
            id: row.Id_Menu,
            nombre: row.nombreMenu,
            padreId: row.padreId,
            posicion: row.posicion,
            ruta: row.ruta,
            icono: row.icono,
            Habilitado: row.Habilitado
        }));
        return menuHijo;
    });
}

export default Sidebar