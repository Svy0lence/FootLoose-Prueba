import Sysmenu from "../models/sysmenu.js"

const getSysMenu = async (req, res) => {
    try {
        const tableSysMenu = await Sysmenu.getSysMenu();
        

        return res.json({
            status: true,
            data: tableSysMenu,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

const getSysSubMenu = async (req, res) => {
    try {
        const tableSysSubMenu = await Sysmenu.getSysSubMenu();

        return res.json({
            status: true,
            data: tableSysSubMenu,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

export default {
    getSysMenu,
    getSysSubMenu
}