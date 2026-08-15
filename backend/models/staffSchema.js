const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    name: {
        type: String,   
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
       college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true
    }
})

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;