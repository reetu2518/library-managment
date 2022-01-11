const bcrypt = require("bcrypt")
const saltRounds = 10;
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const multer  = require('multer')

/**
 * @description: Signup module
 */
exports.signup = async(req, res, next) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let status = req.body.status;
        let mobileNumber = req.body.mobileNumber;
        let roleType = req.body.roleType
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                passwordHash = hash;
                const newUser = new User({
                    name : name,
                    email : email,
                    password: hash,
                    mobileNumber : mobileNumber,
                    roleType : roleType,
                    status: status
                });
                const accessToken = jwt.sign({ userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
                newUser.accessToken = accessToken;
                newUser.save().then(()=>{
                    res.status(200).send({
                        status : 200,
                        message : "User registered successfully!"
                    })
                })
                .catch(error=>{
                    res.status(400).send({
                        status : 400,
                        message : "unable to save to database" + error
                    })
                })
            })
        })
    } catch (error) {
        next(error)
    }
}


/**
 * @description: login module
 */
exports.login = async(req, res, next) => {
    try {
        let email = req.body.email
        let password = req.body.password
        let roleType = req.body.roleType
        const user = User.findOne({ email: email, roleType: roleType }).then((response) => {
            if (response==null) {
                res.send({
                    status : 404,
                    message : "Email doest not exists!"
                });
            } else {
                const dbPassword = response.password;
                bcrypt.compare(password, dbPassword, function (err, result) {
                    if (err) {
                        res.send({
                            status : 200,
                            message : "Unable to fetch record" + err
                        });
                    } else if(result) {
                        const accessToken = jwt.sign({user:response._id}, process.env.JWT_SECRET, {expiresIn : "1d"})
                        User.findByIdAndUpdate(response._id, { accessToken: accessToken },
                            function (err, docs) {
                            if (err){
                                console.log(err)
                            }
                            else{
                                // console.log("Updated User : ", docs);
                            }
                        });
                        res.send({
                            status : 200,
                            message : "Login Successfully!",
                            accessToken : accessToken
                        });
                        
                    } else {
                        res.send({
                            status : 404,
                            message : "Password doesn't matched!"
                        });     
                    }
                })
                
            }
    })
    .catch((err)=>{
        console.log("login error", err)
    })
    } catch (error) {
        next(error)
    }
}


/**
 * @description: all user
 */
exports.fetchAll = async(req, res, next) => {
    try {
        const user = User.find({}).then((response) => {
            if (response==null) {
                res.send({
                    status : 404,
                    message : "Email doest not exists!"
                });
            } else {
                res.send({
                    status : 200,
                    message : "All records fetched!",
                    records : response
                });                
            }
        })
        .catch((err)=>{
            console.log("fetch error", err)
        })
    } catch (error) {
        next(error)
    }
}



/**
 * @description: delete user
 */
exports.userDelete = async(req, res, next) => {
    try {
        let id = req.body.id
        User.findByIdAndDelete(id, function (err, docs) {
            if (err){
                res.send({
                    status : 404,
                    message : "Some internal Error!" + err,
                    error : err
                });
            }
            else{
                res.send({
                    status : 200,
                    message : "User Deleted Successfully!",
                    records : docs
                });                
            }
        });
    } catch (error) {
        next(error)
    }
}


/**
 * @description: profile edit module
 */
 exports.profileEdit = async(req, res, next) => {
    try {
        let id = req.body.id
        let password = req.body.password
        let roleType = req.body.roleType
        let mobileNumber = req.body.mobileNumber
        let name = req.body.name
        let profilePic = ""
        if (req.file) {
            profilePic = req.file.filename
        } 
        let updatedPic = ""
        let date = Date.now()
        const user = User.findOne({ id: id, roleType: roleType }).then((response) => {
            if (response==null) {
                res.send({
                    status : 404,
                    message : "User doesn't not exists!"
                });
            } else {
                const dbPic = response.profilePic;
                bcrypt.genSalt(saltRounds, function (err, salt) {  
                    bcrypt.hash(password, salt, function(err, hash){
                        passwordHash = hash;
                        
                        const accessToken = jwt.sign({user:response._id}, process.env.JWT_SECRET, {expiresIn : "1d"})
                        if (profilePic.length == 0) {
                            updatedPic = dbPic
                        } else {
                            updatedPic = profilePic
                        }
                        User.findByIdAndUpdate(response._id, { accessToken: accessToken, name:name, profilePic:updatedPic, password: passwordHash, mobileNumber:mobileNumber, updatedAt:date },
                            function (err, docs) {
                            if (err){
                                res.send({
                                    status : 400,
                                    message : "Unable to update record" + err
                                });
                            }
                            res.send({
                                status : 200,
                                message : "Updated Successfully!",
                                record : docs
                            });
                        });
                    })
                })
                
            }
    })
    .catch((err)=>{
        console.log("login error", err)
    })
    } catch (error) {
        next(error)
    }
}