require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Agar auth.js backend/routes/ me hai
const authRoutes = require("./routes/auth");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Debug
console.log("TWILIO_SID:", process.env.TWILIO_SID);
console.log("TWILIO_AUTH:", process.env.TWILIO_AUTH);
console.log("TWILIO_PHONE:", process.env.TWILIO_PHONE);

// Routes
app.use("/api", authRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});