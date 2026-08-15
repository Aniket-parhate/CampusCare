const express = require("express");

const {
    registerStaff,
    loginStaff
} = require("../controllers/staffController");

const router = express.Router();
const protect = require("../middlware/authMiddleware");

router.post("/register", registerStaff);
router.post("/login", loginStaff);




module.exports = router;