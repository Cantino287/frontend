import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { CgProfile } from 'react-icons/cg';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8082/user/get');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);
  
    const filteredUsers = users.filter(
      (user) =>
        user.id.toString().includes(searchQuery) ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
    return (
      <div className="space-y animate-fadeIn">
        <nav className="text-black py-6 px-6 flex items-center justify-end">
          {/* Profile logo in top-right corner */}
          <div className="relative">
            <CgProfile className="w-12 h-12 rounded-full border border-gray-300 shadow-lg" />
          </div>
        </nav>
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-9 text-gray-800 text-center">
            📋 List of User Accounts
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Id or Name or Email...                                                                                               🔍"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-[50%] border items-center ml-[345px] rounded-md pl-6 p-2 mb-4"
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="w-full border-collapse border border-gray-300 text-gray-700">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Password</th>
                  <th className="border p-3">Phone</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  {/* <td className="border p-3 text-center">{index + 1}</td> */}
                  <td className="border p-3 text-center">{(currentPage - 1) * usersPerPage + index + 1}</td>
                  <td className="border p-3 text-center font-semibold">{user.name}</td>
                  <td className="border p-3 text-center">{user.email}</td>
                  <td className="border p-3 text-center font-mono text-blue-600">{user.password}</td>
                  <td className="border p-3 text-center">{user.contactNumber}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md border ${currentPage === page ? "bg-gray-800 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

export default UserList;