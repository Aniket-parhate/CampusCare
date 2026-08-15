const express = require("express");

const {
    getCollegeComplaints,
    getComplaintById,
    updateComplaint,
    resolveComplaint
} = require("../controllers/staffComplaintController");

const protect = require("../middlware/authMiddleware");

const router = express.Router();

router.get("/complaints", protect, getCollegeComplaints);

router.get("/complaints/:id", protect, getComplaintById);

router.patch("/complaints/:id/status", protect, updateComplaint);

router.patch("/complaints/:id/resolve", protect, resolveComplaint);

module.exports = router;