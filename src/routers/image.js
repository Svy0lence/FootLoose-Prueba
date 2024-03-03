import { Router } from "express"
import imageController from "../controllers/imageController.js"

const router = Router()

router.get("/:filename", imageController.getImage)

export default router