import mysql from "mysql2"
import { promisify } from "util"

//dotenv.config({ path: "src/.env" })

const pool = mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORTDB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

pool.getConnection((err, conn) => {
    if (err) {
        if (err.code == "PROTOCOl_CONNECTION_LOST") {
            console.log("LA CONEXION DE LA BASE DE DATOS FUE CERRADA");
        }
        if (err.code == "ECONNREFUSED") {
            console.log("LA CONEXION DE LA BASE DE DATOS FUE RECHASADA");
        }
    }
    if (conn) {
        conn.release();
        console.log("💾 DB IS SUCCESSFULLY CONNECTED");
    }

    // CONSOLE ADMIN node src/server.js
    //require("./consoleAdmin")

    return;
});

pool.query = promisify(pool.query);


export default pool