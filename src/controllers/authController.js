import Usuario from "../models/usuarios.js"
import { matchPass, encryptPass } from "../helpers/handleBcrypt.js"

const login = async (req, res) => {
    
    try {
        const { username, password } = req.body

        if (!username) {
            return res.json({
                status: false,
                message: "Ingrese username"
            })
        }

        if (!password) {
            return res.json({
                status: false,
                message: "Ingrese password"
            })
        }

        const user = await Usuario.obtener_Usuario_Auth(username)
        

        if (user[0].length == 0) {
            return res.status(401).json({
                status: false,
                message: "El nombre de usuario y/o constraseña incorrect."
            })
        }

        const isPassword = await matchPass(password, user[0][0].password)
        console.log(isPassword)
        if (!isPassword) {
            return res.status(401).json({
                status: false,
                message: ("El nombre de usuario y/o constraseña incorrecto."),
                
            })
        }

        if (user[0][0].activo === 0) {
            return res.status(401).json({
                status: false,
                message: "La cuenta esta desabilitada."
            })
        }

        if (user[0][0].rol_activo === 0) {
            return res.status(401).json({
                status: false,
                message: "Su Rol esta desabilitada."
            })
        }
 
        
        const parsedUsers = user[0][0];
        delete parsedUsers.password;
   
        return res.json({
            status: true,
            data: parsedUsers,
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }

}

export default {
    login
}