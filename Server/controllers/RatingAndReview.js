const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

exports.createRating = async(req,res) => {
    try{
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;

        const courseDetails = await Course.findOne(
            {   _id:courseId,
                studentsEnrolled: {
                    $elemMatch: {$eq: userId}
                }
            }
        );

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"User is not enrolled in this course"
            })
        }

        const alreadyReviewed = await RatingAndReview.findOne(
            {
                course: courseId,
                user: userId
            }
        );

        if(alreadyReviewed){
            return res.status(409).json({
                success:false,
                message:"You have already reviewed this course"
            })
        }

        const ratingReview = await RatingAndReview.create({
            rating, review,
            course: courseId,
            user: userId
        })

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    ratingAndReview: ratingReview._id
                }
            },
            {new:true}
        )
        console.log("updatedCourseDetails", updatedCourseDetails);

        return res.status(201).json({
            success:true,
            message:"Review and Rating created successfully",
            ratingReview
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

exports.getAverageRating = async(req,res) => {
    try{
        const courseId = req.body.courseId;

        const result = await Course.aggregate(
            {
                $match: {
                    course: new mongoose.Schema.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        )

        if(restlt > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating
            })
        }

        return res.status(200).json({
            success:true,
            message:"Average rating is 0, no rating is given till now",
            averageRating:0
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

exports.getAllRating = async(req,res) => {
    try{
        const allRating = await RatingAndReview.find({})
                                                    .sort("desc")
                                                    .populate(
                                                        {
                                                            path: "course",
                                                            select: "firstName lastName email image"
                                                        }
                                                    )
                                                    .populate(
                                                        {
                                                            path: "user",
                                                            select: "courseName"
                                                        }
                                                    )
                                                    .exec();

        return res.status(200).json({
            success:true,
            message:"All rating and reviews fetched successfully",
            allRating
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