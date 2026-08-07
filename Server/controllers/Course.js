const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.createCourse = async(req,res) => {
    try{
        const {courseName, courseDescription, whatYouWillLearn, price, category} = req.body;

        const thumbnail = req.files?.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category did not exist"
            })
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:userId,
            whatYouWillLearn,
            price,
            thumbnail: thumbnailImage.secure_url,
            category:categoryDetails._id
        });

        await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    courses: newCourse._id
                }
            },
            {new:true}
        )

        await Category.findByIdAndUpdate(
            category,
            {
                $push:{
                    course:newCourse._id
                }
            },
            {new:true}
        )

        return res.status(201).json({
            success:true,
            message:"Course created successfully",
            newCourse
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

exports.showAllCourses = async(req,res) => {
    try{
        const allCourses = await Courses.find({}, {courseName:true,
                                                  courseDescription:true,
                                                  thumbnail:true,
                                                  instructor:true,
                                                  ratingAndReview:true,
                                                  studentsEnrolled:true})
                                                  .populate("instructor")
                                                  .exec();

        return res.status(200).json({
            success:true,
            message:"All courses fetch successfully",
            allCourses
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

exports.getCourseDetails = async(req,res) => {
    try{
        const {courseId} = req.body;

        const courseDetails = await Course.findOne({_id:courseId})
                                                    .populate(
                                                        {
                                                            path: "instructor",
                                                            populate:{
                                                                path:"additionalDetails"
                                                            }
                                                        }
                                                    )
                                                    .populate(
                                                        {
                                                            path: "courseContent",
                                                            populate:{
                                                                path:"subSection"
                                                            }
                                                        }
                                                    )
                                                    .populate("ratingAndReviews")
                                                    .populate("category")
                                                    .populate("studentsEnrolled")
                                                    .exec();

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find course with ${courseId}`
            })
        }

        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            courseDetails
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