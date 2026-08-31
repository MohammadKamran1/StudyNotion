const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../models/User");

exports.auth = async(req,res,next) => {
    try{
        const token = req.cookies?.token
                        || req.body?.token
                        || req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token Missing"
            })
        }

        try{
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Something went wrong while validating the token"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Students only"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor only"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin only"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}