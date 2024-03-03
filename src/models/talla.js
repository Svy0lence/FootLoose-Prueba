import db from "../config/db.js"

const Talla = {}

Talla.gestionar_talla = ( opcion, talla) => {
    const sql = `
    CALL
        sp_Gestion_Talla(?,?,?)
    `

    return db.query(sql, [opcion, talla.idTalla, talla.NombreTalla])
}

Talla.validar_Talla_Existente = (talla) => {
    const sql = `
    CALL
        validar_Talla_Existente(?)
    `

    return db.query(sql, [talla.NombreTalla])
}

export default Talla