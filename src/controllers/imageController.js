import fs from "fs"

const getImage = async (req, res) => {

    try {

        const filename = req.params.filename

        if (!fs.existsSync(`./src/files/images/${filename}`)) {
            return res.status(404).json({
                status: false,
                message: "Not Fount!"
            })
        }

        const fileData = await fs.readFileSync(`./src/files/images/${filename}`)

        res.writeHeader(200, {
            "Content-Type": "image/png",
            "Content-Length": fileData.length
        })

        return res.end(fileData)

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }

}

export default {
    getImage
}