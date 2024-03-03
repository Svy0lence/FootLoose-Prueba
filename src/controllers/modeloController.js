import Modelo from "../models/modelo.js"

const insertModelo = async (req, res) => {
    try {

        let modelo = req.body
        modelo.idModelo = 0;

        if (!modelo.NombreModelo) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }

        const verificaModelo = await Modelo.validar_Modelo_Existente(modelo)

        if (verificaModelo[0][0].TotalActivas >= 1) {
            return res.status(402).json({
                status: false,
                message: 'Ya hay una modelo existente con los mismos datos.'
            });
        }
        

        const insertResult = await Modelo.gestionar_modelo(1, modelo)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Registrar Modelo'
            });
        }

        return res.json({
            status: true,
            message: 'Modelo se creo correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const updateModelo = async (req, res) => {
    try {

        let modelo = req.body

        if (!modelo.NombreModelo) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }

        if (!modelo.idModelo) {
            return res.json({
                status: false,
                message: 'Por favor, seleccione correctamente el modelo a modificar'
            });
        }

        const verificaModelo = await Modelo.validar_Modelo_Existente(modelo)

        if (verificaModelo[0][0].TotalActivas >= 1) {
            return res.status(402).json({
                status: false,
                message: 'Ya hay una modelo existente con los mismos datos.'
            });
        }
        
        const insertResult = await Modelo.gestionar_modelo(2, modelo)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Modificar Modelo'
            });
        }

        return res.json({
            status: true,
            message: 'Modelo se Modifico correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const deleteModelo = async (req, res) => {
    try {

        let modelo = req.body

        if (!modelo.idModelo) {
            return res.json({
                status: false,
                message: 'Por favor, seleccione correctamente la modelo a eliminar'
            });
        }
        

        const insertResult = await Modelo.gestionar_modelo(3, modelo)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al eliminar Modelo'
            });
        }

        return res.json({
            status: true,
            message: 'Modelo se elimino correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const listModelo = async (req, res) => {
    try {
        const modelo = {}
        const insertResult = await Modelo.gestionar_modelo(4, modelo)

        return res.json({
            status: true,
            data: insertResult[0]
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}

export default {
    insertModelo,
    updateModelo,
    deleteModelo,
    listModelo

}