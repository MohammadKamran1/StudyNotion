const nodemailer = require("nodemailer");

require("dotenv").config();

const mailSender = async(email,title,body) => {
    try{
        console.log("EMAIL_HOST:", process.env.MAIL_HOST);
        console.log("EMAIL_USER:", process.env.MAIL_USER);
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const info = await transporter.sendMail({
            from: {name:"StudyNotion", address:process.env.MAIL_USER},
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })

        console.log("Email Sent Successfully", info.messageId);
        return info;
    }
    catch(error){
        console.log("Error in sending mail:", error.message);
    }
}

module.exports = mailSender;