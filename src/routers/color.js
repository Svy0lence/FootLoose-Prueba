import { Router } from "express"
import colorController from "../controllers/colorController.js"


const router = Router()

router.post("/create", colorController.insertColor)
router.post("/update", colorController.updateColor)
router.post("/delete", colorController.deleteColor)
router.get("/list", colorController.listColor)


export default router