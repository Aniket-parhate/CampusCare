const Complaint = require("../models/complaintSchema");


// Get all complaints of staff's college
const getCollegeComplaints = async (req, res) => {
    try {
        const {
            status,
            priority,
            category,
            search,
            page = 1,
            limit = 10
        } = req.query;

        const query = {
            college: req.account.college
        };

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    location: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const pageNumber = Math.max(Number(page), 1);
        const limitNumber = Math.max(Number(limit), 1);
        const skip = (pageNumber - 1) * limitNumber;

        const totalComplaints = await Complaint.countDocuments(query);

        const complaints = await Complaint.find(query)
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        const totalPages = Math.ceil(
            totalComplaints / limitNumber
        );

        res.status(200).json({
            message: "College complaints fetched successfully",

            pagination: {
                currentPage: pageNumber,
                limit: limitNumber,
                totalComplaints,
                totalPages
            },

            complaints
        });

    } catch (error) {
        console.error("GET COLLEGE COMPLAINTS ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get one complaint
const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findOne({
            _id: req.params.id,
            college: req.account.college
        }).populate("createdBy", "name email");

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            message: "Complaint fetched successfully",
            complaint
        });

    } catch (error) {
        console.error("GET COMPLAINT ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Update complaint
const updateComplaint = async (req, res) => {
    try {
        const {
            status,
            priority,
            resolution
        } = req.body;

        const allowedStatuses = [
            "Pending",
            "Assigned",
            "In Progress",
            "Resolved",
            "Closed"
        ];

        const allowedPriorities = [
            "Low",
            "Medium",
            "High",
            "Critical"
        ];

        if (status && !allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        if (priority && !allowedPriorities.includes(priority)) {
            return res.status(400).json({
                message: "Invalid priority"
            });
        }

        const complaint = await Complaint.findOne({
            _id: req.params.id,
            college: req.account.college
        });

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        if (status !== undefined) {
            complaint.status = status;
        }

        if (priority !== undefined) {
            complaint.priority = priority;
        }

        if (resolution !== undefined) {
            complaint.resolution = resolution || null;
        }

        await complaint.save();

        await complaint.populate("createdBy", "name email");

        res.status(200).json({
            message: "Complaint updated successfully",
            complaint
        });

    } catch (error) {
        console.error("UPDATE COMPLAINT ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Resolve complaint
const resolveComplaint = async (req, res) => {
    try {
        const { resolution } = req.body;

        if (!resolution) {
            return res.status(400).json({
                message: "Resolution is required"
            });
        }

        const complaint = await Complaint.findOne({
            _id: req.params.id,
            college: req.account.college
        });

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        complaint.resolution = resolution;
        complaint.status = "Resolved";

        await complaint.save();

        await complaint.populate("createdBy", "name email");

        res.status(200).json({
            message: "Complaint resolved successfully",
            complaint
        });

    } catch (error) {
        console.error("RESOLVE COMPLAINT ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    getCollegeComplaints,
    getComplaintById,
    updateComplaint,
    resolveComplaint
};