import React, { useState } from 'react';
import './App.css';

// Helper function to convert 24h time to 12h AM/PM format
const formatTo12Hour = (time24) => {
  if (!time24) return '';
  const [hourStr, minute] = time24.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; // Converts "0" hours to "12"
  return `${hour}:${minute} ${ampm}`;
};

const App = () => {
  const rooms = ['Room A', 'Room B', 'Room C'];

  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    room: rooms[0],
    date: '',
    startTime: '',
    endTime: ''
  });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateBooking = () => {
    const { room, date, startTime, endTime } = formData;

    if (!room || !date || !startTime || !endTime) {
      return "Please fill out all fields.";
    }
    if (startTime >= endTime) {
      return "Start time must be earlier than end time.";
    }

    const isOverlapping = bookings.some((b) => {
      if (b.room === room && b.date === date) {
        return startTime < b.endTime && endTime > b.startTime;
      }
      return false;
    });

    if (isOverlapping) {
      return `Conflict: ${room} is already booked during this time.`;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateBooking();
    if (validationError) {
      setError(validationError);
      return;
    }

    const newBooking = { ...formData, id: Date.now() };
    
    const updatedBookings = [...bookings, newBooking].sort((a, b) => {
      if (a.date === b.date) return a.startTime.localeCompare(b.startTime);
      return a.date.localeCompare(b.date);
    });

    setBookings(updatedBookings);
    setFormData({ room: rooms[0], date: '', startTime: '', endTime: '' });
  };

  const filteredBookings = bookings.filter(b => 
    b.room.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.date.includes(searchTerm)
  );

  return (
    <div className="app-layout">
      {/* LEFT COLUMN: Booking Form */}
      <aside className="sidebar">
        <div className="brand">
          <span className="logo-icon">📅</span>
          <h1>Workspace</h1>
        </div>

        <div className="form-container">
          <h2>New Booking</h2>
          <p className="subtitle">Reserve a meeting room for your team.</p>
          
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="input-group">
              <label>Select Room</label>
              <select name="room" value={formData.room} onChange={handleChange}>
                {rooms.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="time-row">
              <div className="input-group">
                <label>Start Time</label>
                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>End Time</label>
                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
              </div>
            </div>

            {error && <div className="error-banner">{error}</div>}

            <button type="submit" className="submit-btn">Confirm Booking</button>
          </form>
        </div>
      </aside>

      {/* RIGHT COLUMN: Schedule Dashboard */}
      <main className="main-content">
        <header className="dashboard-header">
          <h2>Schedule Overview</h2>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search by room or date (YYYY-MM-DD)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <div className="bookings-feed">
          {filteredBookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No bookings found</h3>
              <p>{searchTerm ? "Try adjusting your search terms." : "The schedule is completely clear."}</p>
            </div>
          ) : (
            <div className="schedule-list">
              {filteredBookings.map((b) => (
                <div key={b.id} className="schedule-item">
                  <div className="room-badge">
                    <span className="dot"></span>
                    {b.room}
                  </div>
                  <div className="schedule-details">
                    <div className="detail-row">
                      <strong>Date:</strong> {b.date}
                    </div>
                    <div className="detail-row">
                      {/* Applying the helper function here! */}
                      <strong>Time:</strong> {formatTo12Hour(b.startTime)} - {formatTo12Hour(b.endTime)}
                    </div>
                  </div>
                  <div className="status-badge">Confirmed</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;