
const Complaint = require("../models/complaintSchema");

const getStaffDashboard = async (req, res) => {
    try {
        const collegeId = req.account.college;

        const totalComplaints = await Complaint.countDocuments({
            college: collegeId
        });

        const pendingComplaints = await Complaint.countDocuments({
            college: collegeId,
            status: "Pending"
        });

        const inProgressComplaints = await Complaint.countDocuments({
            college: collegeId,
            status: "In Progress"
        });

        const resolvedComplaints = await Complaint.countDocuments({
            college: collegeId,
            status: "Resolved"
        });

        const recentComplaints = await Complaint.find({
            college: collegeId
        })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            message: "Staff dashboard fetched successfully",
            totalComplaints,
            pendingComplaints,
            inProgressComplaints,
            resolvedComplaints,
            recentComplaints
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    getStaffDashboard
};

