const Section = require("../models/Section");
const Course = require("../models/Course");
const Category = require("../models/Category");

exports.createSection = async(req,res) => {
    try{
        const {sectionName,courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(404).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        const section = await Section.create({sectionName});

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:section._id
                }
            },
            {new:true}
        )

        return res.status(201).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails
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

exports.updateSection = async(req,res) => {
    try{
        const {sectionName, sectionId} = req.body;

        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push:{
                    name:updatedSection
                }
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            updatedSection
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.deleteSection = async(req,res) => {
    try{
        const {sectionId} = req.body;

        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"SectionId needed to delete the section"
            })
        }

        const updatedSection = await Section.findByIdAndDelete(sectionId);

        await Course.findByIdAndUpdate(
            courseId,
            {
                $pull:{
                    courseContent:updatedSection._id
                }
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"  
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