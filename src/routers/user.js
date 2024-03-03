import { Router } from "express"
import userController from "../controllers/userController.js"
import fileUpload from "express-fileupload"

const router = Router()

router.post("/create", fileUpload(), userController.insertUser)
router.get("/list", userController.getUsers)
router.post("/update", fileUpload(), userController.updateUser)
router.post("/delete", userController.deleteUser)



export default router