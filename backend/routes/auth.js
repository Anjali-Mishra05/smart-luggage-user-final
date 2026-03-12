// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // MySQL connection
const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

// Helper to generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
let otpStore = {}; // store OTP temporarily

// ---------------- REGISTER ----------------
router.post("/register", (req, res) => {
    const { name, phone, email, password } = req.body;

    if(!name || !phone || !email || !password)
        return res.json({ success:false, message:"All fields are required" });

    const query = "INSERT INTO users (name, email, phone, password) VALUES (?,?,?,?)";
    db.query(query, [name, email, phone, password], (err, result) => {
        if(err) return res.json({ success:false, message:"Failed to save user in DB", error: err });

        return res.json({ success:true, message:"User registered successfully!" });
    });
});

// ---------------- SEND OTP ----------------
router.post("/send-otp", async (req, res) => {
    const { phone } = req.body;
    if(!phone) return res.json({ success:false, message:"Phone is required" });

    const otp = generateOtp();
    otpStore[phone] = otp; // store OTP

    try {
        const msg = await client.messages.create({
            body: `Your Smart Luggage OTP is ${otp}`,
            from: process.env.TWILIO_PHONE,
            to: phone
        });
        console.log(`OTP sent to ${phone}: ${otp} (SID: ${msg.sid})`);
        res.json({ success:true, message:"OTP sent successfully!" });
    } catch(err) {
        console.log(err);
        res.json({ success:false, message:"Failed to send OTP" });
    }
});

// ---------------- VERIFY OTP ----------------
router.post("/verify-otp", (req, res) => {
    const { phone, otp } = req.body;
    if(!phone || !otp) return res.json({ success:false, message:"Phone or OTP missing" });

    if(otpStore[phone] === otp){
        delete otpStore[phone];
        return res.json({ success:true, message:"OTP verified successfully!" });
    } else {
        return res.json({ success:false, message:"Invalid OTP" });
    }
});

// ---------------- LOGIN (Password) ----------------
router.post("/login", (req, res) => {
    const { phone, password } = req.body;
    if(!phone || !password) return res.json({ success:false, message:"Phone & Password required" });

    const query = "SELECT * FROM users WHERE phone = ? AND password = ?";
    db.query(query, [phone, password], (err, results) => {
        if(err) return res.json({ success:false, message:"DB Error", error: err });

        if(results.length > 0){
            return res.json({ success:true, message:"Login successful", user: results[0] });
        } else {
            return res.json({ success:false, message:"Invalid credentials" });
        }
    });
});

module.exports = router;