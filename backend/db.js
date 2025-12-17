const sqlite3 = require('sqlite3').verbose();

// Create / connect to database
const db = new sqlite3.Database('./student_portal.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create doctors table
db.run(`
CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    specialization TEXT,
    email TEXT UNIQUE,
    image TEXT
)
`);

// Create appointments table
db.run(`
CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_id INTEGER,
    patient_name TEXT,
    date TEXT,
    FOREIGN KEY(doctor_id) REFERENCES doctors(id)
)
`);

// Seed Doctors
db.get("SELECT count(*) as count FROM doctors", (err, row) => {
    if (row.count === 0) {
        const stmt = db.prepare("INSERT INTO doctors (name, specialization, email, image) VALUES (?, ?, ?, ?)");
        stmt.run('Dr. Sarah Smith', 'Cardiologist', 'sarah@hospital.com', 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-stethoscope-isolated_1303-29791.jpg');
        stmt.run('Dr. John Doe', 'Dermatologist', 'john@hospital.com', 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg');
        stmt.run('Dr. Emily White', 'Pediatrician', 'emily@hospital.com', 'https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg');
        stmt.run('Dr. Michael Brown', 'Neurologist', 'michael@hospital.com', 'https://img.freepik.com/free-photo/hospital-healthcare-workers-covid-19-treatment-concept-young-doctor-scrubs-making-daily-errands-clinic-listening-patient-symptoms-look-camera-professional-physician-curing-diseases_1258-57233.jpg');
        stmt.finalize();
        console.log("Seeded Doctors table.");
    }
});

// ✅ THIS LINE IS THE MOST IMPORTANT
module.exports = db;
