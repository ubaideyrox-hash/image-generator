const bcrypt = require('bcrypt') //npm i --save bcrypt
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {

        const user = new User({
            username: req.body.name,
            email: req.body.email,
            admin: req.body.admin,
            password: hash
        });

        user.save().then(result => {
            res.status(201).json({
                message: "User Created Successfully",
                data: result,
            })
        }).catch(err => {
            res.status(500).json({

                error: "invalid authentication credentials" + err,
            })
        })
    })

}

exports.getusers = (req, res, next) => {

    User.find().then(record => {
        if (record) {

            res.status(200).json({ data:record })
        } else {
            res.status(404).json({
                message: "Users Not Found!",

            })
        }

    }).catch(error => {
        res.status(500).json({
            message: "Fetching users failed"
        })
    })

}

exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).then((result) => {
        if (result.deletedCount > 0) {
            res.status(201).json({
                message: "User deleted sccuessfully!",
            })
        } else {
            res.status(401).json({
                message: "Not auhtorized!",
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Deleteing a user failed"
        })
    })
}

exports.userLogin = (req, res, next) => {
    let fecheduser;
    User.findOne({ email: req.body.email }).then(userData => {
        if (!userData) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }
        fecheduser = userData;
        return bcrypt.compare(req.body.password, userData.password)
    })
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Auth Failed"
                })
            }
            const token = jwt.sign({ email: fecheduser.email, userId: fecheduser._id }, 'Signage_User_Token', { expiresIn: '1h' })
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fecheduser._id,
                username: fecheduser.username,
                email: fecheduser.email,
                admin: fecheduser.admin,

            });
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Auth failed'
            })
        })
}

exports.updateUser = (req, res, next) => {
    const user = new User({
        username: req.body.name,
        email: req.body.email,
        admin: req.body.admin,
        _id: req.params.id,
    });
    if(req.body.password){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt)
        user.password=hash
    }
    User.updateOne({ _id: req.params.id}, user)
        .then((result) => {
            
            if (result.nModified > 0) {
                res.status(201).json({
                    message: "User Updated Sccuessfully!",
                    data:true
                })
            } 
            
            // else {
            //     res.status(401).json({
            //         message: "Not Auhtorized!",
            //     })
            // }

        }).catch(error => {
            res.status(500).json({
                message: "couldn's update post"
            })
        })

}