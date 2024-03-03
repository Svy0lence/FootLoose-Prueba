import Producto from "../models/producto.js"
import {sendEmail}  from "../config/emailer.js"



const create = async (req, res) => {

    try {

        let producto = req.body

        if (!producto.NombreProducto || !producto.idMarca || !producto.idModelo || !producto.idColor || 
            !producto.idTalla || !producto.PrecioVenta) {
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

            producto.imagen = newImageName

        } else {
            producto.imagen = "product_default.png"
        }

        const verificaProducto = await Producto.validar_Producto_Existente(producto)

        if (verificaProducto[0][0].TotalActivas >= 1) {
            return res.status(402).json({
                status: false,
                message: 'Ya hay un Producto existente con los mismos datos.'
            });
        }

        const insertResult = await Producto.gestionar_producto(1, producto)
        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Registrar Producto'
            });
        }

        return res.json({
            status: true,
            message: "Se creo Producto existosamente!" 
        })

    }
    catch (error) { 
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

const edit = async (req, res) => {

    try {
        let producto = req.body

        if (!producto.NombreProducto || !producto.idMarca || !producto.idModelo || !producto.idColor || 
            !producto.idTalla || !producto.PrecioVenta) {
            return res.json({
                status: false,
                message: 'Por favor, complete todos los campos obligatorios'
            });
        }

        if (!producto.idProducto) {
            return res.json({
                status: false,
                message: 'Por favor, seleccione correctamente la Producto a modificar'
            });
        }

        if (req.files != null) {
            const { image } = req.files
            const ext = image.name.split(".").pop()
            const newImageName = `${Date.now()}.${ext}`
            image.mv("./src/files/images/" + newImageName)

            producto.imagen = newImageName
        }
        
        const verificaProducto = await Producto.validar_Producto_Existente(producto)

        if (verificaProducto[0][0].TotalActivas >= 1) {
            return res.status(409).json({
                status: false,
                message: 'Ya hay un Producto existente con los mismos datos.'
            });
        }

        const precioVentaBD = await Producto.sp_Obtener_PrecioVenta(producto.idProducto)

        if(precioVentaBD[0][0].PrecioVenta !== producto.PrecioVenta){
            const destinatario = 'jordan92002@gmail.com';
            sendEmail(destinatario, producto.idProducto, precioVentaBD[0][0].PrecioVenta, producto.PrecioVenta);
        }

        const insertResult = await Producto.gestionar_producto(2, producto)
        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al Modificar Producto'
            });
        }

        return res.json({
            status: true,
            message: "Se modifico correctamente!"
        })

    }
    catch(error) {

        return res.status(500).json({
            status: false,
            error: error.message
        })
    }

}

const deleteProducto = async (req, res) => {
    try {
        let producto = req.body

        if (!producto.idProducto) {
            return res.json({
                status: false,
                message: 'Por favor, seleccione correctamente la Producto a eliminar'
            });
        }

        const insertResult = await Producto.gestionar_producto(3, producto)
        if (!insertResult) {
            return res.status(500).json({
                status: false,
                message: 'Error al eliminar Producto'
            });
        }

        return res.json({
            status: true,
            message: "Producto se elimino correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error.message
        })
    };

}

const importExcel = async (req, res) => {

    try {

        let excelData = req.body
        
        let productos = []
        let errorProductos = []
        console.log(excelData)
        for(let i = 0; i< excelData.descripcion.length; i++){

            console.log(excelData.descripcion[i], '-',excelData.marca[i], '-',excelData.color[i], '-',excelData.modelo[i]
            , '-',excelData.talla[i], '-',excelData.precio[i])
            
            if(excelData.descripcion[i] == null && excelData.marca[i] == null && excelData.color[i] == null && excelData.modelo[i] == null 
                && excelData.talla[i] == null && excelData.precio[i] == null){
                continue
            }

            if(excelData.descripcion[i] == null || excelData.marca[i] == null || excelData.color[i] == null || excelData.modelo[i] == null 
                || excelData.talla[i] == null || excelData.precio[i] == null){
                
                return res.json({
                    status: false,
                    message: "Hay registros vacios en esta fila: "+ excelData.descripcion[i]+ '-'+excelData.marca[i]+ '-'+excelData.modelo[i]
                    + '-'+excelData.color[i]+'-'+excelData.talla[i]+ '-'+excelData.precio[i]
                })
            }
            
            const idAtr = await Producto.sp_get_Id_Name(excelData.marca[i], excelData.modelo[i], excelData.color[i], excelData.talla[i])
            console.log(idAtr[3].length)
            
            if(idAtr[0].length === 0 || !idAtr[0][0].idMarca){
                return res.json({
                    status: false,
                    message: "El nombre de Marca "+ excelData.marca[i]+ " no esta registrado"  
                })
            }
            if(idAtr[1].length === 0 ||!idAtr[1][0].idModelo){
                return res.json({
                    status: false,
                    message: "El nombre de Modelo "+ excelData.modelo[i]+ " no esta registrado"  
                })
            }

            if(idAtr[2].length === 0 || !idAtr[2][0].idColor){
                return res.json({
                    status: false,
                    message: "El nombre de Color "+ excelData.color[i]+ " no esta registrado"  
                })
            }

            if(idAtr[3].length === 0 || !idAtr[3][0].idTalla ){
                return res.json({
                    status: false,
                    message: "El nombre de Talla "+ excelData.talla[i]+ " no esta registrado"  
                })
            }

            const producto = {
                NombreProducto: excelData.descripcion[i],
                idMarca: idAtr[0][0].idMarca,
                idModelo: idAtr[1][0].idModelo,
                idColor: idAtr[2][0].idColor,
                idTalla: idAtr[3][0].idTalla,
                PrecioVenta: excelData.precio[i],
            }
            productos.push(producto)
            
            
        }
        console.log(productos)

        for(const producto of productos){
            producto.imagen = "product_default.png"
            
            const verificaProducto = await Producto.validar_Producto_Existente(producto)
    
            if (verificaProducto[0][0].TotalActivas >= 1) {
                continue
            }
    
            const insertResult = await Producto.gestionar_producto(1, producto)
            if (!insertResult) {
                const errorInsert = {
                    message: producto.NombreProducto
                }
                errorProductos.push(errorInsert);
                continue
            }
        }
        
        if(errorProductos.length === 0){
            return res.json({
                status: true,
                message: "Se importo el excel correctamente"
            })
        }else{
            let meesageError = '';
            for(const errorProducto of errorProductos){
                meesageError += errorProducto.message + "\n"
            }
            return res.json({
                status: false,
                message: 'Se produjo un error con estos productos: \n'+ meesageError
            });
        }
        

    }
    catch (error) { 
        return res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

const getList = async (req, res) => {

    try {

        const producto = {}
        const insertResult = await Producto.gestionar_producto(4, producto)

        return res.json({
            status: true,
            data: insertResult[0]
        })

    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }

}

export default {
    create,
    edit,
    deleteProducto,
    getList,
    importExcel
}