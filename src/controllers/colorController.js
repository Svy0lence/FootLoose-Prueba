import Color from "../models/color.js"

const insertColor = async (req, res) => {
    try {

        let color = req.body
        color.idColor = 0;

        if (!color.NombreColor) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }

        const verificaColor = await Color.validar_Color_Existente(color)

        if (verificaColor[0][0].TotalActivas >= 1) {
            return res.status(402).json({
                status: false,
                message: 'Ya hay una color existente con los mismos datos.'
            });
        }
        

        const insertResult = await Color.gestionar_color(1, color)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Registrar Color'
            });
        }

        return res.json({
            status: true,
            message: 'Color se creo correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const updateColor = async (req, res) => {
    try {

        let color = req.body

        if (!color.NombreColor) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }
        if (!color.idColor) {
            return res.json({
                status: false,
                message: 'Por favor, seleccione correctamente la color a modificar'
            });
        }

        const verificaColor = await Color.validar_Color_Existente(color)


        if (verificaColor[0][0].TotalActivas >= 1) {
            return res.status(402).json({
                status: false,
                message: 'Ya hay una color existente con los mismos datos.'
            });
        }
        

        const insertResult = await Color.gestionar_color(2, color)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Modificar Color'
            });
        }

        return res.json({
            status: true,
            message: 'Color se Modifico correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const deleteColor = async (req, res) => {
    try {

        let color = req.body

        if (!color.idColor) {
            return res.json({
                status: false,
                message: 'Por favor, seleccione correctamente la color a eliminar'
            });
        }
        

        const insertResult = await Color.gestionar_color(3, color)

        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al eliminar Color'
            });
        }

        return res.json({
            status: true,
            message: 'Color se elimino correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}


const listColor = async (req, res) => {
    try {
        const color = {

        }
        const insertResult = await Color.gestionar_color(4, color)

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
    insertColor,
    updateColor,
    deleteColor,
    listColor

}