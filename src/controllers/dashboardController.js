import Dashboard from "../models/dashboard.js"

const listDashboard = async (req, res) => {
    try {
        const listResult = await Dashboard.list()
        console.log(listResult)
        const auxListDashboard = {
            countMarcas: listResult[0][0].totalMarcas,
            countModelos: listResult[0][0].totalModelos,
            countTalla: listResult[0][0].totalTallas,
            countProducto: listResult[0][0].totalProductos,
        }
        

        return res.json({
            status: true,
            data: auxListDashboard
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}

export default {
    listDashboard
}