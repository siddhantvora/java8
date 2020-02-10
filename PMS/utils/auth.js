const jwt = require('jsonwebtoken')

const encryptor=require('../utils/encryptor')
const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 1000000

const users = {
    user1: 'password1',
    user2: 'password2'
}

 exports.tokenGeneration = (req, res,data) => {
    // Get credentials from JSON body
    if (data.length && encryptor.comparing(req.body.password,data[0].password)) {
            //console.log(data)
            //res.send("logged successfully")
            let username=data[0].loginName
            let role=data[0].role
            let userId=data[0].userId
            const token = jwt.sign({username,role,userId }, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            })
           // console.log('token:', token)    
            

            // set the cookie as the token string, with a similar max age as the token
            // here, the max age is in milliseconds, so we multiply by 1000
            res.json({'token':token,'role':role,'userId':userId})
            // res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
            // //console.log(res)
            // res.end()
        }
        else {
            res.status(401).end();
        }
}
exports.isAuthorised = (req, res,next) => {
    // We can obtain the session token from the requests cookies, which come with every request
    //const token = req.cookies.token
    const token=req.headers.authorization

    // if the cookie is not set, return an unauthorized error
    if (!token) {
        return res.status(401).end()
    }
    
    var payload
    try {
        // Parse the JWT string and store the result in `payload`.
        // Note that we are passing the key in this method as well. This method will throw an error
        // if the token is invalid (if it has expired according to the expiry time we set on sign in),
        // or if the signature does not match
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            return res.status(401).end()
        }
        // otherwise, return a bad request error
        return res.status(400).end()
    }
    //console.log("payload is: "+ JSON.stringify(payload))
    // Finally, return the welcome message to the user, along with their
    // username given in the token
    next(payload);
}
exports.refresh = (req, res) => {
    // (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
    const token = req.cookies.token

    if (!token) {
        return res.status(401).end()
    }

    var payload
    try {
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }
        return res.status(400).end()
    }
    // (END) The code uptil this point is the same as the first part of the `welcome` route

    // We ensure that a new token is not issued until enough time has elapsed
    // In this case, a new token will only be issued if the old token is within
    // 30 seconds of expiry. Otherwise, return a bad request status
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 30) {
        return res.status(400).end()
    }

    // Now, create a new token for the current user, with a renewed expiration time
    const newToken = jwt.sign({ username: payload.username }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    })

    // Set the new token as the users `token` cookie
    res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
    res.end()
}