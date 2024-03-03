import { Router } from "express"
import dashboardController from "../controllers/dashboardController.js"


const router = Router()


router.get("/list", dashboardController.listDashboard)


export default router