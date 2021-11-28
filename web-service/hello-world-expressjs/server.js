const express = require("express")
const cors = require("cors")
const app = express()

// app settings
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({
        "message": "Hello from ExpressJS!"
    })
})

app.get("/:uname", (req, res) => {
    let name = req.params.uname

    res.status(200).send({
        "message": `Hello ${name}! from ExpressJS!`
    })
})

app.listen(9000, () => {
    console.log(`Server running on port 9000`)
})