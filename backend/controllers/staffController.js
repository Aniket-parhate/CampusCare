const Staff = require("../models/staffSchema");
const College = require("../models/collegeSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerStaff = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            collegeName,
            collegeCode
        } = req.body;

        // Check if staff already exists
        const existingStaff = await Staff.findOne({ email });

        if (existingStaff) {
            return res.status(400).json({
                message: "Staff already exists"
            });
        }

        // Check if college already exists
        const existingCollege = await College.findOne({
            code: collegeCode
        });

        if (existingCollege) {
            return res.status(400).json({
                message: "College already exists"
            });
        }

        // Create new college
        const college = await College.create({
            name: collegeName,
            code: collegeCode
        });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create staff
        const staff = await Staff.create({
            name,
            email,
            password: hashedPassword,
            college: college._id
        });

        res.status(201).json({
            message: "College and staff registered successfully",

            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,

                college: {
                    id: college._id,
                    name: college.name,
                    code: college.code
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body;

        const staff = await Staff.findOne({ email });

        if (!staff) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            staff.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: staff._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login successful",

            token,

            staff: {
                id: staff._id,
                name: staff.name,
                email: staff.email,
                college: staff.college
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
    registerStaff,
    loginStaff
};