const express = require("express");

const {
    getStaffDashboard
} = require("../controllers/staffDashboardController");

const  protect  = require("../middlware/authMiddleware");

const router = express.Router();

router.get("/", protect, getStaffDashboard);

module.exports = router;