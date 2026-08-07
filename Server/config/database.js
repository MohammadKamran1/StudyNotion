const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    }).then(() => {
        console.log("Database Connection Success");
    }).catch((error) => {
        console.log("Issue is Connecting with Database");
        console.error(error);
        process.exit(1);
    })
}