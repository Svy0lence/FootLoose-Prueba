import { Router } from "express"
import tallaController from "../controllers/tallaController.js"


const router = Router()

router.post("/create", tallaController.insertTalla)
router.post("/update", tallaController.updateTalla)
router.post("/delete", tallaController.deleteTalla)
router.get("/list", tallaController.listTalla)


export default router