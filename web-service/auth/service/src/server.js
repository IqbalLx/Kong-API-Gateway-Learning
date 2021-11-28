require("dotenv").config()

require("./config/database")

const express = require("express")
const cors = require("cors")
const app = express()

const userRouter = require("./routes/user.routes.js")

// app settings
app.use(cors())
app.use(express.json());

app.use("/", userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})