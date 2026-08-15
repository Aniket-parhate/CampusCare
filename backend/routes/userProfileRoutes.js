const express = require("express");

const {
    getUserProfile,
    updateUserProfile
} = require("../controllers/userController");

const  protect  = require("../middlware/authMiddleware");

const router = express.Router();

router.get("/", protect, getUserProfile);

router.patch("/", protect, updateUserProfile);

module.exports = router;