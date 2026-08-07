const Category = require("../models/Category");

exports.createCategory = async(req,res) => {
    try{
        const {name, description} = req.body;

        if(!name || !descripion){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        const categoryExist = await Category.findOne({name});

        if(categoryExist){
            return res.status(401).json({
                success:false,
                message:"Category already exist"
            })
        }

        const updatedCategory = await Category.create({name:name, description:description});

        return res.status(200).json({
            success: true,
            message:"Category created successfully",
            updatedCategory
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.getAllCategory = async(req,res) => {
    try{
        const allCategory = await Category.find({}, {name:true, description:true});

        return res.status(200).json({
            succesS:true,
            message:"All category fetched successfully",
            allCategory
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.categoryPageDetails = async(req,res) => {
    try{
        const {categoryId} = req.body;

        const selectedCategory = await Category.findById(categoryId)
                                        .populate("courses")
                                        .exec();

        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message: "Data not found"
            })
        }

        const differentCategory = await Category.findOne(
                                        {_id: {$ne: categoryId}})
                                        .populate("courses")
                                        .exec()
        //get top 10 selling courses

        return res.status(200).json({
            success:true,
            date:{
                selectedCategory,
                differentCategory
            }
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}