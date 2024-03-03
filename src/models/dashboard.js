import db from "../config/db.js"

const Dashboard = {}


Dashboard.list = () => {
    const sql = `
    CALL
        sp_CountRegistros()
    `

    return db.query(sql, [])
}

export default Dashboard