Workspace - React Meeting Room Booking System

A modern, single-page React application designed to manage meeting room reservations. This project features a clean dashboard, real-time schedule conflict validation, and dynamic search filtering.

FEATURES:

Smart Conflict Detection: Prevents double-booking by mathematically calculating time overlaps for the same room on the same date.

Time Range Validation: Ensures that the selected start time is strictly earlier than the end time.

Dynamic Search and Filtering: Users can instantly filter the schedule overview by typing a room name or specific date.

Automatic Chronological Sorting: New bookings are automatically sorted by date and time in the dashboard feed.

Human-Readable Formatting: Converts HTML native 24-hour time inputs into a user-friendly 12-hour format for display.

PROJECT STRUCTURE AND CODE EXPLANATION:
This project is built using React and Vite. The entire logic is contained within the src folder.

src/App.jsx (Core Logic and UI)
This is the main component that acts as both the logic controller and the view layer.

State Management: Uses useState to track bookings, formData, validation errors, and the search term.

formatTo12Hour function: A helper function that takes a standard 24-hour string and converts it to a 12-hour AM/PM format for the UI.

validateBooking function: The core algorithmic function. It checks for empty fields, chronological order, and iterates through the bookings array to detect overlaps.

handleSubmit function: Intercepts the form submission, calls the validator, appends a unique ID, sorts the array, and updates the state.

src/App.css (Styling and Layout)
Contains all the custom styling for the application.

Implements a Two-Column Flexbox Layout.

The left column is fixed for the booking form.

The right column is a scrollable feed displaying the sorted schedule cards.

src/index.css (Global Resets)
This file is kept intentionally blank to override the default Vite centralized layout, allowing App.css to take full control of the screen.

GETTING STARTED (LOCAL DEVELOPMENT):
To run this project locally on your machine, follow these steps. Make sure you have Node.js installed on your machine.

Step 1: Unzip the project folder and navigate into it using your terminal.
Command: cd meeting-room-booking

Step 2: Install Dependencies.
Command: npm install

Step 3: Start the Development Server.
Command: npm run dev

Step 4: View the App.
Open your browser and navigate to the URL provided in the terminal (usually http://localhost:5173).

FUTURE ENHANCEMENTS:
If given more time, the following features would be implemented:

Backend Integration: Connect to a server and database for permanent data persistence.

Visual Calendar: Implement a visual weekly grid layout for the schedule overview.

Authentication: Add user login so bookings are tied to specific team members.