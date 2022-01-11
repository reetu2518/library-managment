const validator = require("validator")
// const joi = require("joi");

/**
 * 
 * @description : signup validation 
 */
const signupValidation = (req, res, next) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let status = req.body.status;
        let mobileNumber = req.body.mobileNumber;
        let roleType = req.body.roleType
        if (validator.isEmpty(name) == true) {
            res.status(404).send({
                status : 404,
                message : "Name can not be empty!"
            })
        } else if (validator.isEmpty(email) == true) {
            if (validator(email).isEmail() == true) {
                res.status(404).send({
                    status : 404,
                    message : "Email format is incorrect!"
                })
            } else {
                res.status(404).send({
                    status : 404,
                    message : "Email can not be empty!"
                })
            }
        } else if (validator.isEmpty(password) == true) {
            res.status(404).send({
                status : 404,
                message : "Password can not be empty!"
            })
        } else if (isNaN(status)) {
            res.status(404).send({
                status : 404,
                message : "Status can not be empty!"
            })
        } else if (isNaN(mobileNumber)) {
            res.status(404).send({
                status : 404,
                message : "Mobile Number can not be empty!"
            })
        }
        next()
    } catch (error) {
        next(error)
    }
}


/**
 * 
 * @description : login validation 
 */
const loginValidation = (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let status = req.body.status;
        let roleType = req.body.roleType
        if (validator.isEmpty(email) == true) {
            console.log(validator.isEmail(email), "email");
            if (validator.isEmail(email) == true) {
                res.status(404).send({
                    status : 404,
                    message : "Email format is incorrect!"
                })
            } else {
                res.status(404).send({
                    status : 404,
                    message : "Email can not be empty!"
                })
            }
        } else if (validator.isEmpty(password) == true) {
            res.status(404).send({
                status : 404,
                message : "Password can not be empty!"
            })
        } else if (roleType.length == 0) {
            res.status(404).send({
                status : 404,
                message : "Role type can not be empty!"
            })
        }
        if (status) {
            if (isNaN(status) && status.length == 0) {
                res.status(404).send({
                    status : 404,
                    message : "Status can not be empty!"
                })
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}



/**
 * 
 * @description : profile edit validation 
 */
const profileValidation = (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let status = req.body.status;
        let roleType = req.body.roleType
        let id = req.body.id
        if (validator.isEmpty(email) == true) {
            if (validator.isEmail(email) == true) {
                res.status(404).send({
                    status : 404,
                    message : "Email format is incorrect!"
                })
            } else {
                res.status(404).send({
                    status : 404,
                    message : "Email can not be empty!"
                })
            }
        } else if (validator.isEmpty(password) == true) {
            res.status(404).send({
                status : 404,
                message : "Password can not be empty!"
            })
        } else if (roleType.length == 0) {
            res.status(404).send({
                status : 404,
                message : "Role type can not be empty!"
            })
        }
        if (status) {
            if (isNaN(status) && status.length == 0) {
                res.status(404).send({
                    status : 404,
                    message : "Status can not be empty!"
                })
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}



/**
 * 
 * @description : category validation 
 */
const categoryValidation = (req, res, next) => {
    try {
        let title = req.body.title;
        if (validator.isEmpty(title) == true) {
            res.status(404).send({
                status : 404,
                message : "Title can not be empty!"
            });
        } 
        next()
    } catch (error) {
        next(error)
    }
}


/**
 * 
 * @description : book validation 
 */
const bookValidation = (req, res, next) => {
    try {
        let title = req.body.title;
        let categoryId = req.body.categoryId;
        let isbn = req.body.isbn;
        let author = req.body.author;
        if (validator.isEmpty(title) == true) {
            res.status(404).send({
                status : 404,
                message : "Title can not be empty!"
            });
        } else if (categoryId.length == 0) {
            res.status(404).send({
                status : 404,
                message : "Category Id can not be empty!"
            });
        } 
        else if (isNaN(isbn)) {
            res.status(404).send({
                status : 404,
                message : "Isbn can not be empty!"
            });
        } else if (validator.isEmpty(author) == true) {
            res.status(404).send({
                status : 404,
                message : "Author can not be empty!"
            });
        } 
        next()
    } catch (error) {
        next(error)
    }
}


/**
 * 
 * @description : borrow book validation 
 */
const borrowBookValidation = (req, res, next) => {
    try {
        let bookId = req.body.bookId;
        let userId = req.body.userId;
        let borrowQuantity = req.body.quantity;
        let borrowDate = req.body.borrowDate;
        let status = req.body.status;
        if (validator.isEmpty(bookId) == true) {
            res.status(404).send({
                status : 404,
                message : "Book Id can not be empty!"
            });
        } else if (userId.length == 0) {
            res.status(404).send({
                status : 404,
                message : "User Id can not be empty!"
            });
        } 
        else if (isNaN(borrowQuantity)) {
            res.status(404).send({
                status : 404,
                message : "Borrow Quantity can not be empty!"
            });
        } else if (validator.isEmpty(borrowDate) == true) {
            res.status(404).send({
                status : 404,
                message : "Borrow Date can not be empty!"
            });
        } else if (validator.isEmpty(status) == true) {
            res.status(404).send({
                status : 404,
                message : "Status can not be empty!"
            });
        } 
        next()
    } catch (error) {
        next(error)
    }
}


/**
 * 
 * @description : borrow book by user id
 */
const borrowHistoryByUserId = (req, res, next) => {
    try {
        let userId = req.body.userId;
        if (userId.length == 0) {
            res.status(404).send({
                status : 404,
                message : "User Id can not be empty!"
            });
        } 
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signupValidation,
    loginValidation,
    categoryValidation,
    bookValidation,
    borrowBookValidation,
    borrowHistoryByUserId,
    profileValidation
}