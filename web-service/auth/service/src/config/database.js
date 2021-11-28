require("dotenv").config()

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL || process.env.MONGODB_URL_LOCAL, {
    auth: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD
    },
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log("DB Connected!")
})

module.exports = mongoose