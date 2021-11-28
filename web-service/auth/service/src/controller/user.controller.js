require("dotenv").config()
const request = require("request")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const user = require("../model/user.model.js")

exports.register = (req, res) => {
    const {
        username,
        email,
        password
    } = req.body

    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.HASH_SALT))

    user.create({
        username,
        email,
        password: hashedPassword
    })
    .then((doc) => {
        res.status(201).send({
            status: true,
            err: null,
            msg: "User succesfully created!"
        })
    })
    .catch((err) => {
        res.status(500).send({
            status: false,
            err: "email already in used!",
            msg: err
        })
    })
}

exports.login = (req, res) => {
    const {
        email,
        password
    } = req.body

    user.findOne({
        email
    })
    .then((doc) => {
        if (!doc) res.status(404).send({
            status: false,
            err: "email not found",
            msg: "email not found!"
        })

        let isPassValid = bcrypt.compareSync(
            password,
            doc.password
        )

        if (!isPassValid) return res.status(401).send({
            status: false,
            err: "password",
            msg: "Password wrong!"
        })
        
        // retrieve credentials from kong and sign new token
        request.get(process.env.KONG_ADMIN, (err, resp, body) => {
            if (resp.statusCode != 200) {
                res.status(500).send({
                    status: false,
                    err: "kong down",
                    msg: "kong down"
                })
            }
            
            let parsedBody = JSON.parse(body)
            let data = parsedBody.data[0]

            let keyId = data.key
            let algorithm = data.algorithm
            let secret = data.secret
            
            let token = jwt.sign({
                username: doc.username,
                email: doc.email
            }, secret, { 
                algorithm: algorithm,
                keyid: keyId,
                expiresIn: "7d" 
            })
    
            res.status(200).send({
                token,
                type: "Bearer "
            })
        })
    })
}