import Rol from "../models/roles.js"


const create = async (req, res) => {

    try {
        const { name, listMenu } = req.body

        if (!name || !listMenu) {
            return res.status(401).json({
                status: false,
                message: "Ingrese todos lo datos"
            })
        }

        const rol = {
            name: name, 
            estado: 1, 
        }

        let saveRol;
        let saveMenuRol;
        
                                //( rol, rolId, menu, option)
        saveRol = await Rol.gestionar_rol(1, rol, 0, 0)
        if (!saveRol[0][0].last_id) {
            return res.status(401).json({
                status: false,
                message: "No se puedo crear el rol"
            })
        }

        
        for(const menu of listMenu){
            saveMenuRol = await Rol.gestionar_rol(4, rol, menu.id, saveRol[0][0].last_id)
        }

        return res.json({
            status: true,
            data: saveRol
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

const update = async (req, res) => {

    try {
        const { rol, rolId, listMenu } = req.body
        let saveRol;
        let deleteRol;
        let saveMenuRol;


        console.log(rol.name+ " "+ rol.estado);
        console.log(rolId);

        if (!rol.name || !rolId  || !listMenu) {
            console.log("ingrese datos")
            return res.status(401).json({
                status: false,
                message: "Ingrese todos lo datos"
            })
        }

        
        saveRol = await Rol.gestionar_rol(2, rol, 0, rolId, )

        deleteRol = await Rol.gestionar_rol(5, rol, 0, rolId)
        for(const menu of listMenu){
            saveMenuRol = await Rol.gestionar_rol(4, rol, menu.id, rolId)
        }

        return res.json({
            status: true,
            data: saveRol
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }

}


const deleteRol = async (req, res) => {

    try {
        const rolId = req.body.rolId
        console.log(rolId)
        const rol = {
            name: "", 
            estado: 0, 
        };

        if (!rolId) {
            return res.status(401).json({
                status: false,
                message: "Ingrese todos lo datos"
            });
        }

        const deleteRol = await Rol.gestionar_rol(3, rol, 0, rolId)
        
        return res.json({
            status: true,
            data: deleteRol
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }

}

const getRol = async (req, res) =>{
    try{
        const tableRoles = await Rol.getRoles();

        return res.json({
            status: true,
            data: tableRoles,
        })
    }catch(error){
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

const getRol_Activo = async (req, res) =>{
    try{
        const Roles_Activos = await Rol.getRoles_Activos();
        
        return res.json({
            status: true,
            data: Roles_Activos,
        })
    }catch(error){
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

export default{
    getRol,
    create,
    deleteRol,
    update,
    getRol_Activo
}