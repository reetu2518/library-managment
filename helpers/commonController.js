const Category = require("../models/categoryModel")

exports.categoryById = async (id) => {
    await Category.findById(id)
    .then((res)=>{
        const title = res.title
    })
    .catch((error)=>{
        console.log(error)
        next(error)
    })
}