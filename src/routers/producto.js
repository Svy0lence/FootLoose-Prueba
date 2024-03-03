import { Router } from "express"
import ProductoController from "../controllers/productoController.js"
import fileUpload from "express-fileupload"

const router = Router()

router.post("/create", fileUpload(), ProductoController.create)
router.post("/update", fileUpload(), ProductoController.edit)
router.post("/delete", ProductoController.deleteProducto)
router.get("/list", ProductoController.getList)
router.post("/excelImport", ProductoController.importExcel)

export default router