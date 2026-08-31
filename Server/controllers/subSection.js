const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.createSubSection = async(req,res) => {
    try{
        const {sectionId, title, timeDuration, description} = req.body;

        const video = req.files.videoFile;

        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url
        });

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push:{
                    subSection: subSectionDetails._id
                }
            },
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            SubSectionDetails,
            updatedSection
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

exports.updateSubSection = async(req,res) => {
    try{
        const {subSectionId, title, timeDuration, description} = req.body;
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.deleteSubSection = async(req,res) => {
    try{
        const {subSectionId} = req.body;
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}