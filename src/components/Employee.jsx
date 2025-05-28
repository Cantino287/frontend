import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { CgProfile } from 'react-icons/cg';

const Admin = () => {
    const roles = ["Cashier", "Waiter", "Chef","Delivery" ];
    const [searchQuery, setSearchQuery] = useState("");
    const [employees, setEmployees] = useState([
      { id: 1, name: "John Doe", email: "john.doe@example.com", password: "123456", role: "Cashier" },
      { id: 2, name: "Jane Smith", email: "jane.smith@example.com", password: "password123", role: "Waiter" },
      { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", password: "chefpass", role: "Chef" }
    ]);
    const [adminEmails, setAdminEmails] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "http://localhost:8082/user/admin";

  useEffect(() => {
    fetchAdminEmails();
  }, []);
  const fetchAdminEmails = async () => {
    try {
      const response = await axios.get(API_URL);
      setAdminEmails(response.data);
    } catch (error) {
      console.error("Error fetching admin emails:", error);
    }
  };
  // const filteredAdmins = adminEmails.filter(email =>
  //   email.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const filteredAdmins = adminEmails.filter((admin) =>
  admin.id.toString().includes(searchQuery) ||
  admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  admin.email.toLowerCase().includes(searchQuery.toLowerCase())
);

  
    const [currentPage, setCurrentPage] = useState(1);
    // const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ name: "", email: "", password: "", role: roles[0] });
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
  
    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(employees.length / itemsPerPage);
  
    const filteredEmployees = employees.filter(employee =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditingEmployee({ ...editingEmployee, [name]: value });
    };
  
    const addEmployee = () => {
      const employee = { id: employees.length + 1, ...newEmployee };
      setEmployees([...employees, employee]);
      setShowForm(false);
      setNewEmployee({ name: "", email: "", password: "", role: roles[0] });
    };
  
    const deleteEmployee = () => {
      setEmployees(employees.filter(emp => emp.id !== employeeToDelete));
      setShowDeleteConfirm(false);
      setEmployeeToDelete(null);
    };
  
    const confirmDelete = (id) => {
      setEmployeeToDelete(id);
      setShowDeleteConfirm(true);
    };
  
    const updateEmployee = () => {
      setEmployees(employees.map(emp => (emp.id === editingEmployee.id ? editingEmployee : emp)));
      setEditingEmployee(null);
      setShowForm(false);
    };
  
    const openEditForm = (employee) => {
      setEditingEmployee(employee);
      setShowForm(true);
    };
  
    const cancelEdit = () => {
      setEditingEmployee(null);
      setShowForm(false);
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
  
  
    return (
      <div className="space-y animate-fadeIn">
        <nav className="text-black py-6 px-6 flex items-center justify-end">
          {/* Profile logo in top-right corner */}
          <div className="relative">
            <CgProfile className="w-12 h-12 rounded-full border border-gray-300 shadow-lg" />
          </div>
        </nav>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">👥 Employee Management</h2>
        <button onClick={() => setShowForm(true)} className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">Add New Employee</button>
        <input
          type="text"
          placeholder="Search employees...                                                                                                                  🔍"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[50%] border ml-[200px] pl-6 rounded-md p-2 mb-8"
        />
        <table className="w-full border-collapse border border-gray-300 mb-7">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Password</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          {/* <tbody>
            {filteredAdmins.map((user, index) => (
              <tr key={user.id} className="border border-gray-300 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{startIndex + index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">{user.password}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button onClick={() => openEditForm(emp)} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Edit</button>
                  <button onClick={() => confirmDelete(emp.id)} className="px-3 ml-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
  {filteredAdmins.map((user, index) => (
    <tr key={user.id} className="border border-gray-300 hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2">{startIndex ? startIndex + index + 1 : index + 1}</td>
      <td className="border border-gray-300 px-4 py-2">{user.name}</td>
      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
      <td className="border border-gray-300 px-4 py-2">{user.role}</td>
      <td className="border border-gray-300 px-4 py-2">{user.password}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <button
          onClick={() => openEditForm(user)}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => confirmDelete(user.id)}
          className="px-3 ml-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
            
        {showForm && editingEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-2xl font-bold mb-4">Edit Employee</h3>
              <input type="text" name="name" value={editingEmployee.name} onChange={handleInputChange} placeholder="Name" className="border rounded-md p-2 w-full mb-2" />
              <input type="email" name="email" value={editingEmployee.email} onChange={handleInputChange} placeholder="Email" className="border rounded-md p-2 w-full mb-2" />
              <input type="password" name="password" value={editingEmployee.password} onChange={handleInputChange} placeholder="Password" className="border rounded-md p-2 w-full mb-2" />
              <select name="role" value={editingEmployee.role} onChange={handleInputChange} className="border rounded-md p-2 w-full">
                {roles.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={updateEmployee} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
                <button onClick={cancelEdit} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
              </div>
            </div>
          </div>
        )}
  
        {/* adding employee form */}
  
        {showForm && !editingEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-2xl font-bold mb-4">Add New Employee</h3>
              <input type="text" name="name" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} placeholder="Name" className="border rounded-md p-2 w-full mb-2" />
              <input type="email" name="email" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} placeholder="Email" className="border rounded-md p-2 w-full mb-2" />
              <input type="password" name="password" value={newEmployee.password} onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })} placeholder="Password" className="border rounded-md p-2 w-full mb-2" />
              <select name="role" value={newEmployee.role} onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })} className="border rounded-md p-2 w-full">
                {roles.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={addEmployee} className="bg-green-500 text-white px-4 py-2 rounded-md">Add Employee</button>
                <button onClick={() => setShowForm(false)} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
              </div>
            </div>
          </div>
        )}
  
  
        {/* deletion form */}
  
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-2xl font-bold mb-4">Are you sure you want to delete?</h3>
              <div className="flex justify-end gap-2">
                <button onClick={deleteEmployee} className="bg-red-500 text-white px-4 py-2 rounded-md">Sure</button>
                <button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
              </div>
            </div>
          </div>
        )}
         {/* page switching */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          >
            Previous
          </button>
  
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-4 py-2 rounded-md ${currentPage === num ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {num}
            </button>
          ))}
  
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

export default Admin;