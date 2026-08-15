const Complaint = require("../models/complaintSchema");

const getStaffDashboard = async (req, res) => {
    try {
        const collegeId = req.account.college;

        const totalComplaints = await Complaint.countDocuments({
            college: collegeId
        });

        const pending = await Complaint.countDocuments({
            college: collegeId,
            status: "Pending"
        });

        const assigned = await Complaint.countDocuments({
            college: collegeId,
            status: "Assigned"
        });

        const inProgress = await Complaint.countDocuments({
            college: collegeId,
            status: "In Progress"
        });

        const resolved = await Complaint.countDocuments({
            college: collegeId,
            status: "Resolved"
        });

        const closed = await Complaint.countDocuments({
            college: collegeId,
            status: "Closed"
        });

        const critical = await Complaint.countDocuments({
            college: collegeId,
            priority: "Critical"
        });

        const highPriority = await Complaint.countDocuments({
            college: collegeId,
            priority: "High"
        });

        res.status(200).json({
            message: "Staff dashboard data fetched successfully",

            dashboard: {
                totalComplaints,
                pending,
                assigned,
                inProgress,
                resolved,
                closed,
                critical,
                highPriority
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
    getStaffDashboard
};