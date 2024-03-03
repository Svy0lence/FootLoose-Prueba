import { Router } from "express"
import rolController from "../controllers/rolController.js"


const router = Router()

router.post("/create", rolController.create)
router.get("/list", rolController.getRol)
router.get("/list-activo", rolController.getRol_Activo)
router.post("/delete", rolController.deleteRol)
router.post("/update", rolController.update)

export default router