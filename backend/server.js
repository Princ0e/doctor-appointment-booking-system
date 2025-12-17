const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // for Live Server frontend
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // allow frontend fetch from Live Server

const db = require('./db');

// API to get all doctors
app.get("/api/doctors", (req, res) => {
    db.all("SELECT * FROM doctors", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// API to book an appointment
app.post("/api/appointments", (req, res) => {
    const { doctor_id, patient_name, date } = req.body;
    db.run(
        `INSERT INTO appointments (doctor_id, patient_name, date) VALUES (?, ?, ?)`,
        [doctor_id, patient_name, date],
        function (err) {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": { id: this.lastID }
            });
        }
    );
});

// API to get appointments
app.get("/api/appointments", (req, res) => {
    const query = `
        SELECT appointments.id, appointments.patient_name, appointments.date, 
               doctors.name as doctor_name, doctors.specialization 
        FROM appointments 
        JOIN doctors ON appointments.doctor_id = doctors.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// API to delete an appointment
app.delete("/api/appointments/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM appointments WHERE id = ?", id, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    });
});

// Simple Login route (mock for now, can be updated later)
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    // Mock login success for simple transition
    if (email && password) {
        res.json({ success: true, message: "login successful" });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Admin Login Route
app.post("/admin-login", (req, res) => {
    const { email, password } = req.body;
    // Hardcoded Admin Credentials
    if (email === "admin@hospital.com" && password === "111111") {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: "Invalid Admin Credentials" });
    }
});

// Backend only serves API; Live Server serves HTML
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
