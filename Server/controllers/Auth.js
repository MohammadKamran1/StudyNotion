const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sendOTP = async(req,res) => {
    try{
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User Already Exist"
            })
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        var result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email,otp};
        console.log(otpPayload);

        const otpBody = await OTP.create(otpPayload);
        console.log("OTP BODY",otpBody);

        await OTP.findOne({ email }).sort({ createdAt: -1 });

        return res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp
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

exports.signUp = async(req,res) => {
    console.log("SIGNUP CONTROLLER HIT");
    try{
        const {firstName,
            lastName,
            email,
            accountType,
            password,
            confirmPassword,
            // contactNumber,
            otp
        } = req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password should be same"
            })
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist"
            })
        }

        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1});

        if(!recentOtp){
            return res.status(400).json({
                success:false,
                message:"OTP Not Found"
            })
        } else if(otp !== recentOtp.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            // contactNumber
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            // contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"User registered successfully",
            user
        });
    }
    catch(error){
        console.log("Error",error);
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

exports.login = async(req,res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await User.findOne({email});

        console.log("User Found", user);

        if(!user){
            return res.status(403).json({
                success:false,
                message:"User does not exist"
            })
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h"});

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true
            }

            return res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully"
            })
        } else {
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

// exports.changePassword = async(req,res) => {
//     try{

//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             error:error.message
//         })
//     }
// }