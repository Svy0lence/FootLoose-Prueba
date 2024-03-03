import { Router } from "express"
import sysmenuController from "../controllers/sysmenuController.js"



const router = Router()

router.get("/listMenu" ,sysmenuController.getSysMenu)
router.get("/listSubMenu" ,sysmenuController.getSysSubMenu)


export default router