const Complaint = require("../models/complaintSchema");

const createComplaint = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            location,
            priority
        } = req.body;

        const user = req.account;

        const complaint = await Complaint.create({
            title,
            description,
            category,
            location,
            priority,

            createdBy: user._id,
            college: user.college
        });

        res.status(201).json({
            message: "Complaint created successfully",
            complaint
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            college: req.account.college,
            createdBy: req.account._id
        })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Complaints fetched successfully",
            complaints
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createComplaint,
    getMyComplaints
};