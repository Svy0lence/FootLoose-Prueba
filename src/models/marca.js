import db from "../config/db.js"

const Marca = {}

Marca.gestionar_marca = ( opcion, marca) => {
    const sql = `
    CALL
        sp_Gestion_Marca(?,?,?)
    `

    return db.query(sql, [opcion, marca.idMarca, marca.NombreMarca])
}

Marca.validar_Marca_Existente = (marca) => {
    const sql = `
    CALL
    validar_Marca_Existente(?)
    `

    return db.query(sql, [marca.NombreMarca])
}

export default Marca