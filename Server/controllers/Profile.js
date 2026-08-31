const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async(req,res) => {
    try{
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        const userId = req.user.id;

        console.log("UserId", userId);

        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails
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

exports.deleteAccount = async(req,res) => {
    try{
        const {userId} = req.body;

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"UserId required to delete the account"
            })
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User does not found"
            })
        }

        const profileId = user.profileDetails;

        await Profile.findByIdAndDelete(profileId);
        await Course.updateMany(
            {studentsEnrolled:userId},
            {$pull: {
                studentsEnrolled: userId
            }}
        )
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success:true,
            message:"Account deleted successfully"
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