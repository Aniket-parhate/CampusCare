const Complaint = require("../models/complaintSchema");

const getUserDashboard = async (req, res) => {
    try {
        const userId = req.account._id;

        const totalComplaints = await Complaint.countDocuments({
            createdBy: userId
        });

        const pending = await Complaint.countDocuments({
            createdBy: userId,
            status: "Pending"
        });

        const assigned = await Complaint.countDocuments({
            createdBy: userId,
            status: "Assigned"
        });

        const inProgress = await Complaint.countDocuments({
            createdBy: userId,
            status: "In Progress"
        });

        const resolved = await Complaint.countDocuments({
            createdBy: userId,
            status: "Resolved"
        });

        const closed = await Complaint.countDocuments({
            createdBy: userId,
            status: "Closed"
        });

        res.status(200).json({
            message: "User dashboard data fetched successfully",
            dashboard: {
                totalComplaints,
                pending,
                assigned,
                inProgress,
                resolved,
                closed
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    getUserDashboard
};