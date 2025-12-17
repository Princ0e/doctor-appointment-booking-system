# Doctor Appointment Booking System (HealthCare Plus)

## Overview
This is a full-stack web application designed to facilitate doctor appointment bookings. It features a user-friendly interface for patients to book appointments and a secure admin dashboard for hospital staff to manage bookings and doctors.

## Features
- **Patient Portal**
  - **Browse Doctors**: View a list of available doctors and their specializations.
  - **Book Appointments**: Schedule appointments with specific doctors.
  - **User Authentication**: Secure login for patients.
  
- **Admin Dashboard**
  - **Admin Login**: Secure access for administrators.
  - **Appointment Management**: View details of all booked appointments.
  - **doctor Management**: Add or remove doctors from the system.

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Communication**: REST API

## Getting Started

### Prerequisites
- Node.js installed on my machine.

### Installation

#### 1. Backend Setup
The backend handles API requests and database operations.

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:3000`.

#### 2. Frontend Setup
The frontend interacts with the backend API.

1. Navigate to the `frontend` folder.
2. It is recommended to use **Live Server** (VS Code extension) or any simple HTTP server to serve the files.
   - Open `index.html` in your browser.

## Usage

### Admin Access
To access the admin dashboard:
1. Go to `admin-login.html` (or click Admin Login in the app).
2. Log in with the following default credentials:
   - **Email**: `admin@hospital.com`
   - **Password**: `111111`
