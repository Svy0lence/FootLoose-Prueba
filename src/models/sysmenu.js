import db from "../config/db.js"

const sysmenu = {}

sysmenu.getSysMenu= () => {
    const sql = `
    CALL
        sp_Mostrar_Menus
    `
    return db.query(sql).then(([rows]) => {
        const sysMenus = rows.map(row => ({
            id: row.Id_Menu,
            nombre: row.nombreMenu,
            padreId: row.padreId,
            posicion: row.posicion,
            ruta: row.ruta,
            icono: row.icono,
            Habilitado: row.Habilitado,          
        }));
        return sysMenus;
    });
}

sysmenu.getSysSubMenu= () => {
    const sql = `
    CALL
        sp_Mostrar_SubMenus
    `
    return db.query(sql).then(([rows]) => {
        const sysSubMenus = rows.map(row => ({
            id: row.Id_Menu,
            nombre: row.nombreMenu,
            padreId: row.padreId,
            posicion: row.posicion,
            ruta: row.ruta,
            icono: row.icono,
            Habilitado: row.Habilitado,            
        }));
        return sysSubMenus;
    });
}

export default sysmenu