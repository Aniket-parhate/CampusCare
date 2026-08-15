const express = require("express");

const protect = require("../middlware/authMiddleware");

const {
    createComplaint,
    getMyComplaints
} = require("../controllers/complaintController");

const router = express.Router();

router.post("/create", protect, createComplaint);

router.get("/my", protect, getMyComplaints);

module.exports = router;