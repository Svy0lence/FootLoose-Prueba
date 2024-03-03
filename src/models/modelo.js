import db from "../config/db.js"

const Modelo = {}

Modelo.gestionar_modelo = ( opcion, modelo) => {
    const sql = `
    CALL
        sp_Gestion_Modelo(?,?,?)
    `

    return db.query(sql, [opcion, modelo.idModelo, modelo.NombreModelo])
}

Modelo.validar_Modelo_Existente = (modelo) => {
    const sql = `
    CALL
        validar_Modelo_Existente(?)
    `

    return db.query(sql, [modelo.NombreModelo])
}

export default Modelo