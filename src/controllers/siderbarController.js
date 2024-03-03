import Sidebar from "../models/sidebar.js"

const getMenuFather = async (req, res) => {
    try {
        const user = req.body

        const menuPadre = await Sidebar.obtenerMenuPadre(user);

        return res.json({
            status: true,
            data: menuPadre,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

const getMenuChildren = async (req, res) => {
    try {
        const user = req.body

        const menuhijo = await Sidebar.obtenerMenuHijo(user);

        return res.json({
            status: true,
            data: menuhijo,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

export default {
    getMenuFather,
    getMenuChildren
}
