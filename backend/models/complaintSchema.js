const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Electrical",
                "Water",
                "Cleaning",
                "Furniture",
                "Internet",
                "Classroom",
                "Other"
            ]
        },

        location: {
            type: String,
            required: true
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Medium"
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Assigned",
                "In Progress",
                "Resolved",
                "Closed"
            ],
            default: "Pending"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        resolution: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;