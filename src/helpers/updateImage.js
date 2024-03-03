import multer from "multer"
import sharp from "sharp"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/files/images")
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop() //TODO: imagen.png -> png
        cb(null, `${Date.now()}.${ext}`)
    }
})


const upload = multer({ storage })

export default upload