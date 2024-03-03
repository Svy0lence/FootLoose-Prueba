import db from "../config/db.js"

const Producto = {}

Producto.gestionar_producto = (option, producto) => {

    const sql = `
    CALL 
        sp_Gestion_Producto(?,?,?,?,?,?,?,?,?)
    `

    return db.query(sql, [
        option,
        producto.idProducto, 
        producto.NombreProducto, 
        producto.idMarca, 
        producto.idModelo,
        producto.idColor,
        producto.idTalla,
        producto.imagen,
        producto.PrecioVenta,
    ])
}

Producto.validar_Producto_Existente = (producto) => {
    const sql = `
    CALL
        validar_Producto_Existente(?,?,?,?,?,?,?)
    `

    return db.query(sql, [
        producto.NombreProducto,
        producto.idMarca, 
        producto.idModelo,
        producto.idColor,
        producto.idTalla,
        producto.imagen,
        producto.PrecioVenta,
    ])
}

Producto.sp_get_Id_Name = (NombreMarca, NombreModelo, NombreColor, NombreTalla) => {
    const sql = `
    CALL
        sp_get_Id_Name(?,?,?,?)
    `

    return db.query(sql, [
        NombreMarca,
        NombreModelo,
        NombreColor,
        NombreTalla,
    ])
}

Producto.sp_Obtener_PrecioVenta = (idProducto) => {
    const sql = `
    CALL
        sp_Obtener_PrecioVenta(?)
    `

    return db.query(sql, [idProducto])
}

export default Producto