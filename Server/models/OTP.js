const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60
    }
});

//a function --> to send mails
async function sendVerificationMail(email,otp){
    try{
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otp);
        console.log("Email Sent Successfully: ", mailResponse);
    }
    catch(error){
        console.log(error.message);
    }
}

otpSchema.pre("save", async function(next) {
    await sendVerificationMail(this.email, this.otp);
})

module.exports = mongoose.model("OTP", otpSchema);