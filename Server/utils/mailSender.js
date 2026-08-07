const nodemailer = require("nodemailer");

const mailSender = async(email,title,body) => {
    try{
        const transporter = nodemailer.createTransporter({
            host: process.env.EMAIL_HOST,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const info = transporter.sendMail({
            from: 'StudyNotion || Mohammad Kamran',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })

        console.log(info);
        return info;
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;