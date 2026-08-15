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

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Filter by priority
        if (priority) {
            query.priority = priority;
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Search by title or location
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

        // Pagination
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
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Update complaint status
const updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Assigned",
            "In Progress",
            "Resolved",
            "Closed"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
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

        complaint.status = status;

        await complaint.save();

        res.status(200).json({
            message: "Complaint status updated successfully",
            complaint
        });

    } catch (error) {
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

        res.status(200).json({
            message: "Complaint resolved successfully",
            complaint
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    getCollegeComplaints,
    getComplaintById,
    updateComplaintStatus,
    resolveComplaint
};