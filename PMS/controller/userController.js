var user = require('../model/user')
var encryptor = require('../utils/encryptor')
var auth = require('../utils/auth')
exports.getUsers = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin') {
            user.find({}, (err, data) => {
                if (err)
                    res.status(400).json(err);
                else
                    res.json(data);
            })
        } else {
            res.status(403).end();
        }
    })
}
exports.isUniqueLoginName = (req, res) => {

    user.find({ loginName: req.body.loginName }, (err, data) => {
        if (err) {
            res.status(400).json(err)
        }
        else {
            console.log(data)
            if (data.length == 0)
                res.json(true)
            else
                res.json(false)
        }
    })
}
exports.getUserById = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin') {
            user.find({ "userId": req.params.userId }, (err, data) => {
                if (err)
                    res.status(400).json(err)
                else
                    res.json(data);
            })
        } else {
            res.status(403).end();
        }
    })

}
exports.registerUser = (req, res) => {
    let encrPassword = encryptor.hashing(req.body.password);
    let newUser = new user({
        "userId": req.body.userId,
        "userName": req.body.userName,
        "email": req.body.email,
        "phone": req.body.phone,
        "loginName": req.body.loginName,
        "password": encrPassword,
        "role": req.body.role,
        "status": req.body.status
    })
    newUser.save((err) => {
        if (err)
            res.status(400).json(err)
        else
            res.json("registered succefully");
    })
}
exports.loginUser = (req, res) => {

    user.find({ loginName: req.body.loginName }, (err, data) => {
        if (err)
            throw err;
             if (data.length==0) {
                //console.log(data)
                res.status(400).json("use valid credentials")
            }
            else {
            
            
            console.log(req.body.loginName)
            auth.tokenGeneration(req, res, data);
            }
    })
}
exports.updateUserPassword = (req, res) => {
    let encrPassword = encryptor.hashing(req.body.password);
    user.findOneAndUpdate({ "userName": req.body.userName }, {

        $set: { "password": encrPassword }
    },
        (err, data) => {
            if (err)
                throw err;
            if (data.length) {
                //console.log(data)
                res.json("updated successfully")
            }
            else {
                res.json("can't update successfully")
            }
        })
}
exports.updateUser = (req, res) => {
    user.findOneAndUpdate({ "userId": req.params.userId }, {
        $set: {
            "userName": req.body.userName,
            "email": req.body.email,
            "phone": req.body.phone,
            "loginName": req.body.loginName,
            "password": req.body.password,
            "role": req.body.role,
            "status": req.body.status
        }
    },
        (err) => {
            if (err)
                throw err;
            res.json("updated succefully");
        })
}
exports.deleteUser = (req, res) => {
    user.findOneAndRemove({ "userId": req.params.userId },
        (err) => {
            if (err)
                throw err;
            res.json("deleted succefully");
        })
}
