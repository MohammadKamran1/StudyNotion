const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async(req,res) => {
    try{
        const {email} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.json({
                success:false,
                message:"Your Email is not registered with"
            });
        }

        const token = crypto.randomUUID();

        const updateDetails = await User.findByIdAndUpdate(
                                        {email:email},
                                        {
                                            token: token,
                                            resetPasswordExpires: Date.now() + 5 * 60 * 1000
                                        },
                                        {new:true});

        const url = `https://localhost:3000/update-password/${token}`;

        await mailSender(email, "Password Reset Link", `Password Reset Link ${url}`);

        return res.json({
            success:true,
            message:"Email Sent Successfully, Please check your Email and change your password"
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

exports.resetPassword = async(req,res) => {
    try{
        const {password, confirmPassword, token} = req.body;

        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Password should be same"
            })
        }

        const tokenDetails = await User.findOne({token:token});

        if(!tokenDetails){
            return res.json({
                success:false,
                message:"Invalid Token"
            })
        }

        if(tokenDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token has expired"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"Password reset successful"
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