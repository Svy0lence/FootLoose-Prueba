import { Router } from "express"
import marcaController from "../controllers/marcaController.js"


const router = Router()

router.post("/create", marcaController.insertMarca)
router.post("/update", marcaController.updateMarca)
router.post("/delete", marcaController.deleteMarca)
router.get("/list", marcaController.listMarca)


export default router