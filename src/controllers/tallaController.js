import Talla from "../models/talla.js"

const insertTalla = async (req, res) => {
    try {

        let talla = req.body
        talla.idTalla = 0;

        if (!talla.NombreTalla) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }

        const verificaTalla = await Talla.validar_Talla_Existente(talla)

        if (verificaTalla[0][0].TotalActivas >= 1) {
            return res.status(402).json({
                status: false,
                message: 'Ya hay una talla existente con los mismos datos.'
            });
        }
        

        const insertResult = await Talla.gestionar_talla(1, talla)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Registrar Talla'
            });
        }

        return res.json({
            status: true,
            message: 'Talla se creo correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const updateTalla = async (req, res) => {
    try {

        let talla = req.body

        if (!talla.NombreTalla) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }
        if (!talla.idTalla) {
            return res.json({
                status: false,
                message: 'Por favor, seleccione correctamente la talla a modificar'
            });
        }

        const verificaTalla = await Talla.validar_Talla_Existente(talla)


        if (verificaTalla[0][0].TotalActivas >= 1) {
            return res.status(402).json({
                status: false,
                message: 'Ya hay una talla existente con los mismos datos.'
            });
        }
        

        const insertResult = await Talla.gestionar_talla(2, talla)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Modificar Talla'
            });
        }

        return res.json({
            status: true,
            message: 'Talla se Modifico correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const deleteTalla = async (req, res) => {
    try {

        let talla = req.body

        if (!talla.idTalla) {
            return res.json({
                status: false,
                message: 'Por favor, seleccione correctamente la talla a eliminar'
            });
        }
        

        const insertResult = await Talla.gestionar_talla(3, talla)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al eliminar Talla'
            });
        }

        return res.json({
            status: true,
            message: 'Talla se elimino correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const listTalla = async (req, res) => {
    try {
        const talla = {

        }
        const insertResult = await Talla.gestionar_talla(4, talla)

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
    insertTalla,
    updateTalla,
    deleteTalla,
    listTalla

}