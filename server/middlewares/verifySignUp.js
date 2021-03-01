const db = require('../model');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUserNameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        if (user) {
            res.status(400).send({message: 'Failed! Username is already in use!'})
            return
        }
    })

    User.findOne({
        email: req.body.email
    }).exec((err, email) => {
        if (err) {
            res.status(500).send({message: err})
        }

        if (email) {
            res.status(400).send({message: "'Failed! Email is already in use!"})
            return
        }

        next()
    })
}

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let index = 0; idex < req.body.roles.length; index++) {
           if (!ROLES.includes(req.body.roles[i])) {
            res.status(400).send({message: `Failed! Role ${req.body.roles[i]} dose not exist`})
           }
           return
        }
    }
    next()
}

const verifySignUp = {
    checkDuplicateUserNameOrEmail,
    checkRolesExisted
}

module.exports = verifySignUp;