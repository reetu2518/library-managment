const Category = require("../models/categoryModel")


/**
 * @description: Category module
 */
exports.category = async(req, res, next) => {
    try {
        let title = req.body.title;
        const newUser = new Category({
            title : title
        });
        newUser.save().then(()=>{
            res.status(200).send({
                status : 200,
                message : "Record Saved to database",
            })
        })
        .catch(error=>{
            res.status(400).send({
                status : 400,
                message : "unable to save to database" + error,
            })
        })           
    } catch (error) {
        next(error)
    }
}