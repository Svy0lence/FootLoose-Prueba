import Usuario from "../models/usuarios.js"
import { encryptPass } from "../helpers/handleBcrypt.js"

const insertUser = async (req, res) => {

    try {

        let user = req.body

        if (!user.username || !user.password || !user.nombre || !user.apellido || !user.id_rol) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }

        if (req.files != null) {
            const { image } = req.files

            const ext = image.name.split(".").pop()
            const newImageName = `${Date.now()}.${ext}`
            image.mv("./src/files/images/" + newImageName)

            user.photo = newImageName

        } else {
            user.photo = "avatar_default.jpg"
        }

        user.estado = 1
        user.id_rol = Number(user.id_rol)
        //console.log(user);
        const verificarUser = await Usuario.validar_Username_Existente(user);

        if (verificarUser == 1) {
            return res.status(402).json({
                status: false,
                message: 'El usuario ya existe.'
            });
        }
        console.log(user.password)
        const auxPassword = await encryptPass(user.password)
        user.password = auxPassword;

        const insertResult = Usuario.gestionar_usuario(user, 1)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Registrar Usuario'
            });
        }

        return res.json({
            status: true,
            message: 'Usuario se creo correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}

const updateUser = async (req, res) => {

    try {

        let user = req.body

        if (!user.username || !user.password || !user.nombre || !user.apellido || !user.id_rol) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }

        if (req.files != null) {
            const { image } = req.files
            const ext = image.name.split(".").pop()
            const newImageName = `${Date.now()}.${ext}`
            image.mv("./src/files/images/" + newImageName)

            user.photo = newImageName
        }
        
        if (user.estado == 'true'  || user.estado == '1') {
            user.estado= 1
        } else {
            user.estado = 0
        }

        user.id_rol = Number(user.id_rol)
        
        const bdPassword = await Usuario.obtener_Password_Usuario(user.username);

        if(bdPassword[0][0].password !== user.password){
            const auxPassword = await encryptPass(user.password)
            user.password = auxPassword;
        }

        const updateResult = await Usuario.gestionar_usuario(user, 2)

        if (!updateResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Registrar Usuario'
            });
        }

        return res.json({
            status: true,
            message: 'Usuario se creo correctamente'
        });

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}

const deleteUser = async (req, res) => {
    try {

        let user =req.body
        
        if (!user.username) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }

        user.photo = '';
        
        user.id_rol = 1
        user.estado = 1
        user.id_rol = Number(user.id_rol)
        console.log(user);
       

        const insertResult = Usuario.gestionar_usuario(user, 3)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Eliminar Usuario'
            });
        }

        return res.json({
            status: true,
            message: 'Usuario se elimino correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}

const getUsers = async (req, res) => {
    try {
        const tableUsers = await Usuario.obtener_Usuarios_Rol();

        return res.json({
            status: true,
            data: tableUsers,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

export default {
    insertUser,
    getUsers,
    updateUser,
    deleteUser
}