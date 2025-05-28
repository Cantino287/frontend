import '../styles/AdminDashboard.css';

import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { key: "overview", label: "Overview" },
    { key: "tables", label: "Table Management" },
    { key: "orders", label: "Order Management" },
    { key: "menu", label: "Food Menu" },
    { key: "reservations", label: "Reservation Management" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {menuItems.map(({ key, label }) => (
        <button
          key={key}
          className={`block w-full text-left p-3 rounded-md hover:bg-gray-700 transition ${
            activeSection === key ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveSection(key)}
        >
          {label}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
