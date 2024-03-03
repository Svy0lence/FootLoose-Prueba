import { Router } from "express"
import siderbarController from "../controllers/siderbarController.js"

const router = Router()

router.post("/getMenuFather", siderbarController.getMenuFather)
router.post("/getMenuChildren", siderbarController.getMenuChildren)

export default router