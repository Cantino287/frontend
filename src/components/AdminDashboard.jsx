import './AdminDashboard.css';

import React, { useState } from 'react';

import CategoryCreate from './Category_Create';
import DeliInfo from './DeliInfo';
import Employee from './Employee';
import FoodMenu from './FoodMenu';
import OrderManagement from './OrderManagement';
import Overview from './Overview';
import TableDashboard from './TableDashboard';
import UserList from './UserList';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");


  const handleLogout = () => {
    // Placeholder for logout logic
    console.log("Logged out");
  };

  return (
    <div className="flex h-screen bg-gray-100">
    <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <nav className="space-y-4">
        <button
          className={`w-full  p-3 rounded-lg hover:bg-gray-700 transition duration-300 ${activeSection === "overview" ? "bg-gray-700" : ""
            }`}
          onClick={() => setActiveSection("overview")}
        >
          Overview
        </button>
        <button
          className="w-full p-3 rounded-lg hover:bg-gray-700 transition duration-300"
          onClick={() => setActiveSection("tables")}
        >
          Table Management
        </button>
        <button
          className="w-full p-3 rounded-lg hover:bg-gray-700 transition duration-300"
          onClick={() => setActiveSection("orders")}
        >
          Order Management
        </button>
        <button
          className="w-full p-3 rounded-lg hover:bg-gray-700 transition duration-300"
          onClick={() => setActiveSection("menu")}
        >
          Food Menu
        </button>
        <button
          className="w-full p-3 rounded-lg hover:bg-gray-700 transition duration-300"
          onClick={() => setActiveSection("category")}
        >
          Add New Category
        </button>
        <button
          className="w-full p-3 rounded-lg hover:bg-gray-700 transition duration-300"
          onClick={() => setActiveSection("deliveries")}
        >
          Deliveries Information
        </button>

        <button
          className="w-full p-3 rounded-lg hover:bg-gray-700 transition duration-300"
          onClick={() => setActiveSection("users")}
        >
          Lists of Users
        </button>
        <button
          className="w-full p-3 rounded-lg hover:bg-gray-700 transition duration-300"
          onClick={() => setActiveSection("employee")}
        >
          Employee
        </button>
      </nav>
      <div className="fixed w-[10%] bottom-12 left-10">
        <button
          onClick={handleLogout}
          className="w-full p-3 rounded-lg bg-red-500 hover:bg-red-600 transition duration-300 text-center"
        >
          Log Out
        </button>
      </div>
    </aside>

    <main className="flex-1 p-6 overflow-auto">
      {activeSection === "overview" && <Overview />}
      {activeSection === "tables" && <TableDashboard />}
      {activeSection === "orders" && <OrderManagement />}
      {activeSection === "menu" && <FoodMenu />}
      {activeSection === "category" && <CategoryCreate />}
      {activeSection === "deliveries" && <DeliInfo />}
      {activeSection === "users" && <UserList />}
      {activeSection === "employee" && <Employee />}
    </main>
  </div>
  );
};

export default AdminDashboard;
