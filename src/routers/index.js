import { Router } from "express"
import auth from "./auth.js"
import user from "./user.js"
import image from "./image.js"
import sidebar from "./sidebar.js"
import rol from "./rol.js"
import sysmenu from "./sysmenu.js"
import producto from "./producto.js"
import marca from "./marca.js"
import modelo from "./modelo.js"
import color from "./color.js"
import talla from "./talla.js"
import dashboard from "./dashboard.js"


const router = Router()

router.use("/auth", auth)
router.use("/user", user)
router.use("/images", image)
router.use("/sidebar", sidebar)
router.use("/rol", rol)
router.use("/sysmenu", sysmenu)
router.use("/producto", producto)
router.use("/marca", marca)
router.use("/modelo", modelo)
router.use("/color", color)
router.use("/talla", talla)
router.use("/dashboard", dashboard)


export default router