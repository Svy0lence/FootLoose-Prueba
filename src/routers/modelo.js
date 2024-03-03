import { Router } from "express"
import modeloController from "../controllers/modeloController.js"


const router = Router()

router.post("/create", modeloController.insertModelo)
router.post("/update", modeloController.updateModelo)
router.post("/delete", modeloController.deleteModelo)
router.get("/list", modeloController.listModelo)


export default router