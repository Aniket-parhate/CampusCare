require("dotenv").config();

const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the CampusCare API");
});

const protect = require("./middlware/authMiddleware");

app.get("/api/test", protect, (req, res) => {
    res.json({
        message: "Protected route working",
        accountType: req.accountType,
        account: req.account
    });
});

const userRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const staffComplaintRoutes = require("./routes/staffComplaintRoutes");
const staffDashboardRoutes = require("./routes/staffDashboardRoutes");
const userDashboardRoutes = require("./routes/userDashboardRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");

app.use("/user/profile", userProfileRoutes);

app.use("/user/dashboard", userDashboardRoutes);

app.use("/staff/dashboard", staffDashboardRoutes);
app.use("/staff", staffComplaintRoutes);
app.use("/complaint", complaintRoutes);
app.use("/staff", staffRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});