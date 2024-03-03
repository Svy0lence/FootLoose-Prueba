import express from "express"
import http from "http"
import cors from "cors"
import router from "./routers/index.js"

const app = express()
const server = http.createServer(app)

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1", router)

server.listen(PORT, () => {
    console.log(`🚀 SERVER ON: http://localhost:${PORT}`);
})



