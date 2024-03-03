import Marca from "../models/marca.js"

const insertMarca = async (req, res) => {
    try {

        let marca = req.body
        marca.idMarca = 0;

        if (!marca.NombreMarca) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }

        const verificaMarca = await Marca.validar_Marca_Existente(marca)

        if (verificaMarca[0][0].TotalActivas >= 1) {
            return res.status(402).json({
                status: false,
                message: 'Ya hay una marca existente con los mismos datos.'
            });
        }
        

        const insertResult = await Marca.gestionar_marca(1, marca)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Registrar Marca'
            });
        }

        return res.json({
            status: true,
            message: 'Marca se creo correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const updateMarca = async (req, res) => {
    try {

        let marca = req.body

        if (!marca.NombreMarca) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }
        if (!marca.idMarca) {
            return res.json({
                status: false,
                message: 'Por favor, seleccione correctamente la marca a modificar'
            });
        }

        const verificaMarca = await Marca.validar_Marca_Existente(marca)


        if (verificaMarca[0][0].TotalActivas >= 1) {
            return res.status(402).json({
                status: false,
                message: 'Ya hay una marca existente con los mismos datos.'
            });
        }
        

        const insertResult = await Marca.gestionar_marca(2, marca)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Modificar Marca'
            });
        }

        return res.json({
            status: true,
            message: 'Marca se Modifico correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const deleteMarca = async (req, res) => {
    try {

        let marca = req.body

        if (!marca.idMarca) {
            return res.json({
                status: false,
                message: 'Por favor, seleccione correctamente la marca a eliminar'
            });
        }
        

        const insertResult = await Marca.gestionar_marca(3, marca)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al eliminar Marca'
            });
        }

        return res.json({
            status: true,
            message: 'Marca se elimino correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const listMarca = async (req, res) => {
    try {
        const marca = {

        }
        const insertResult = await Marca.gestionar_marca(4, marca)

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
    insertMarca,
    updateMarca,
    deleteMarca,
    listMarca

}