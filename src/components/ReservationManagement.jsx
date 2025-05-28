// import '../styles/AdminDashboard.css';
import './ReservationManagement.css'; // Import CSS file

import React from 'react';

const ReservationManagement = () => {
  const reservations = [
    "John Doe - 7:00 PM",
    "Jane Smith - 8:00 PM",
    "Michael Brown - 9:00 PM",
  ];

  return (
    <div className="reservation-management">
      <h2 className="section-title">Reservation Management</h2>
      <div className="reservation-list">
        <ul>
          {reservations.map((reservation, index) => (
            <li key={index} className="reservation-item">
              {reservation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReservationManagement;

