import db from "../config/db.js"

const Color = {}

Color.gestionar_color = ( opcion, color) => {
    const sql = `
    CALL
        sp_Gestion_Color(?,?,?)
    `

    return db.query(sql, [opcion, color.idColor, color.NombreColor])
}

Color.validar_Color_Existente = (color) => {
    const sql = `
    CALL
        validar_Color_Existente(?)
    `

    return db.query(sql, [color.NombreColor])
}

export default Color