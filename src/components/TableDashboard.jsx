import './TableDashboard.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { CgProfile } from 'react-icons/cg';

const TableDashboard = () => {
    const [tables, setTables] = useState(
        [...Array(9)].map((_, i) => ({
          id: i + 1,
          status: i % 2 === 0 ? "Available" : "Occupied",
          seats: Math.floor(Math.random() * 4) + 2,
          password: Math.random().toString(36).slice(-6),
        }))
      );
      const [selectedTable, setSelectedTable] = useState(null);
      const [showCreateForm, setShowCreateForm] = useState(false);
      const [showEditForm, setShowEditForm] = useState(false);
      const [newTable, setNewTable] = useState({ tableNumber: "", seats: "", password: "" });
      const [editTableId, setEditTableId] = useState("");
      const [editTable, setEditTable] = useState(null);
      const [originalTableId, setOriginalTableId] = useState(null);
    
    
      const totalTables = tables.length;
      const occupiedTables = tables.filter(
        (table) => table.status === "Occupied"
      ).length;
      const availableTables = totalTables - occupiedTables;
    
      const updateTableStatus = (id, newStatus) => {
        setTables(
          tables.map((table) => (table.id === id ? { ...table, status: newStatus } : table))
        );
      };
    //   const fetchTables = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:8082/table-login/all");
    //         setTables(response.data);
    //     } catch (error) {
    //         console.error("Error fetching tables:", error);
    //     }
    // };
    const fetchTables = async () => {
      try {
        const response = await fetch("http://localhost:8082/table-login/all");
        if (response.ok) {
          const data = await response.json();
          setTables(data); // Setting tables state
        } else {
          console.error("Failed to fetch tables:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    useEffect(() => {
        fetchTables();
    }, []);
    
    
    
    


    const handleCreateTable = async (e) => {
      e.stopPropagation();
      const { tableNumber, seats, password } = newTable;
  
      if (!tableNumber || seats <= 0 || !password) {
          alert("Please fill all fields correctly.");
          return;
      }
  
      try {
          const response = await fetch("http://localhost:8082/table-login/add", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  tableNumber: tableNumber.toString(), // Ensure it's sent as a string
                  seat: seats.toString(), // Ensure it's sent as a string
                  password: password
              }),
          });
  
          if (response.ok) {
              const newTableData = await response.json();
              setTables([...tables, { id: newTableData.tableNumber, seats: newTableData.seat, password: newTableData.password, status: "Available" }]);
              setShowCreateForm(false);
              setNewTable({ tableNumber: "", seats: "", password: "" });
              alert("Table created successfully!");
          } else {
              alert("Failed to create table.");
          }
      } catch (error) {
          console.error("Error creating table:", error);
          alert("An error occurred.");
      }
  };


  
    
    
    
      // const handleStatusChange = () => {
      //   if (!selectedTable) return;
      //   setTables(
      //     tables.map((table) =>
      //       table.id === selectedTable.id
      //         ? {
      //           ...table,
      //           status: table.status === "Available" ? "Occupied" : "Available",
      //         }
      //         : table
      //     )
      //   );
      //   setSelectedTable(null);
      // };
    
      const handleStatusChange = async () => {
        if (!selectedTable) return;
    
        // Determine new status
        const newStatus =
          selectedTable.status === "Available" ? "Occupied" : "Available";
    
        try {
          // Send update request to backend
          await axios.put(
            `http://localhost:8082/table-login/update-status/${selectedTable.id}`,
            { status: newStatus }
          );
    
          // Update UI immediately
          setTables(
            tables.map((table) =>
              table.id === selectedTable.id ? { ...table, status: newStatus } : table
            )
          );
    
          setSelectedTable(null);
        } catch (error) {
          console.error("Error updating table status:", error);
        }
      };
      

    //   const handleEditTable = async () => {
    //     if (!editTable) return;

    //     try {
    //         await axios.put(`http://localhost:8082/table-login/edit/${editTable.id}`, editTable);
    //         fetchTables();
    //         setShowEditForm(false);
    //         setEditTable(null);
    //     } catch (error) {
    //         console.error("Error editing table:", error);
    //     }
    // };
    const handleEditTable = async () => {
      if (!editTable) return;

      try {
          await axios.put(`http://localhost:8082/table-login/edit/${editTable.id}`, {
              tableNumber: editTable.tableNumber.toString(),
              seat: editTable.seats.toString(),
              password: editTable.password
          });

          fetchTables();
          setShowEditForm(false);
          setEditTable(null);
      } catch (error) {
          console.error("Error editing table:", error);
      }
  };


  return (
    <div className="space-y mb-9 animate-fadeIn">
    <nav className="text-black py-6 px-6 flex items-center justify-end">
      {/* Profile logo in top-right corner */}
      <div className="relative">
        <CgProfile className="w-12 h-12 rounded-full border border-gray-300 shadow-lg" />
      </div>
    </nav>

    <div onClick={() => setSelectedTable(null)}>
      <h1 className="text-3xl font-bold mb-8 flex items-center justify-center">🍽️ Table Management</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow text-center">
          <h4 className="text-lg font-semibold text-blue-800">Total Tables</h4>
          <p className="text-2xl font-bold text-blue-900">{totalTables}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg shadow text-center">
          <h4 className="text-lg font-semibold text-red-800">
            Occupied Tables
          </h4>
          <p className="text-2xl font-bold text-red-900">{occupiedTables}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow text-center">
          <h4 className="text-lg font-semibold text-green-800">
            Available Tables
          </h4>
          <p className="text-2xl font-bold text-green-900">{availableTables}</p>
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        onClick={(e) => {
          e.stopPropagation();
          setShowCreateForm(true);
        }}
      >
        Create Table
      </button>
      <button
        className="mt-4 ml-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
        onClick={(e) => {
          e.stopPropagation();
          setShowEditForm(true);
        }}
      >
        Edit Table
      </button>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">Create Table</h3>
            <input
  type="number"
  value={newTable.tableNumber}
  onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
  className="border p-2 w-full mb-2"
  placeholder="Table Number"
  min="1"
/>
<input
  type="number"
  value={newTable.seats}
  onChange={(e) => setNewTable({ ...newTable, seats: e.target.value })}
  className="border p-2 w-full mb-2"
  placeholder="Seats"
/>
<input
  type="text"
  value={newTable.password}
  onChange={(e) => setNewTable({ ...newTable, password: e.target.value })}
  className="border p-2 w-full mb-2"
  placeholder="Password"
/>
<button
  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
  onClick={handleCreateTable}
>
  Create
</button>

            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition ml-2"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        {tables.map((table) => (
          <div
            key={table.id}
            className="p-6 bg-white rounded-lg shadow-md text-center border border-gray-300 hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTable(table);
            }}
          >
            <h3 className="text-lg mb-[10px] font-semibold">Table {table.id}</h3>
            <p
              className={`text-sm font-medium p-1 rounded-md ${table.status === "Available"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
                }`}
            >
              {table.status}
            </p>
          </div>
        ))}
        {/* <div className="table-list">
        {tables.length > 0 ? (
          tables.map((table) => (
            <div key={table.id} className="table-item">
              <h3>Table {table.id}</h3>
              <p>Status: {table.status}</p>
              <p>Seats: {table.seats}</p>
              <p>Password: {table.password}</p>
            </div>
          ))
        ) : (
          <p>No tables available</p>
        )}
      </div> */}


        {showEditForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
              <h3 className="text-2xl font-bold mb-4">Edit Table</h3>
              <select
                value={editTableId}
                onChange={(e) => {
                  const selected = tables.find(
                    (table) => table.id === Number(e.target.value)
                  );
                  setEditTableId(e.target.value);
                  setEditTable(selected || null);
                  setOriginalTableId(selected ? selected.id : null);
                }}
                className="border p-2 w-full mb-2"
              >
                <option value="">Select Table</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    Table {table.id}
                  </option>
                ))}
              </select>
              {editTable && (
                <>
                  <input
                    type="number"
                    value={editTable.id}
                    onChange={(e) => setEditTable({ ...editTable, id: Number(e.target.value) })}
                    className="border p-2 w-full mb-2"
                    placeholder="Table Number"
                  />
                  <input
                    type="number"
                    value={editTable.seats}
                    onChange={(e) =>
                      setEditTable({
                        ...editTable,
                        seats: Number(e.target.value),
                      })
                    }
                    className="border p-2 w-full mb-2"
                    placeholder="Seats"
                  />
                  <input
                    type="text"
                    value={editTable.password}
                    onChange={(e) =>
                      setEditTable({ ...editTable, password: e.target.value })
                    }
                    className="border p-2 w-full mb-2"
                    placeholder="Password"
                  />
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    onClick={handleEditTable}
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        
        

        {selectedTable && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Table {selectedTable.id} Details
              </h3>
              <p className="mb-[5px]">Seats: {selectedTable.seat}</p>
              <p className="mb-[5px]">Password: {selectedTable.password}</p>
              <p className="mb-[5px]">Status: {selectedTable.status}</p>
              <div className="space-x-4 mt-4">
                {selectedTable.status === "Available" ? (
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() =>
                      handleStatusChange(selectedTable.id, "Occupied")
                    }
                  >
                    Set as Occupied
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    onClick={() =>
                      handleStatusChange(selectedTable.id, "Available")
                    }
                  >
                    Set as Available
                  </button>
                )}
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                  onClick={() => setSelectedTable(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default TableDashboard;

// ____________________________________________________________________________________________________________________________________

// import './TableDashboard.css';

// import React, {
//   useEffect,
//   useState,
// } from 'react';

// import axios from 'axios';
// import { CgProfile } from 'react-icons/cg';

// const TableDashboard = () => {
//   const [tables, setTables] = useState([]);
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [newTable, setNewTable] = useState({ tableNumber: "", seats: "", password: "" });
//   const [editTable, setEditTable] = useState(null);
  
//   const fetchTables = async () => {
//     try {
//       const response = await axios.get("http://localhost:8082/table-login/all");
//       setTables(response.data);
//     } catch (error) {
//       console.error("Error fetching tables:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTables();
//   }, []);

//   const handleCreateTable = async (e) => {
//     e.stopPropagation();
//     if (!newTable.tableNumber || newTable.seats <= 0 || !newTable.password) {
//       alert("Please fill all fields correctly.");
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:8082/table-login/add", {
//         tableNumber: newTable.tableNumber.toString(),
//         seat: newTable.seats.toString(),
//         password: newTable.password,
//       });
//       if (response.status === 200) {
//         fetchTables();
//         setShowCreateForm(false);
//         setNewTable({ tableNumber: "", seats: "", password: "" });
//         alert("Table created successfully!");
//       }
//     } catch (error) {
//       console.error("Error creating table:", error);
//       alert("Failed to create table.");
//     }
//   };

//   const handleStatusChange = async () => {
//     if (!selectedTable) return;
//     const newStatus = selectedTable.status === "Available" ? "Occupied" : "Available";

//     try {
//       await axios.put(`http://localhost:8082/table-login/update-status/${selectedTable.id}`, { status: newStatus });
//       setTables((prevTables) =>
//         prevTables.map((table) =>
//           table.id === selectedTable.id ? { ...table, status: newStatus } : table
//         )
//       );
//       setSelectedTable(null);
//     } catch (error) {
//       console.error("Error updating table status:", error);
//     }
//   };

//   const handleEditTable = async () => {
//     if (!editTable) return;
//     try {
//       await axios.put(`http://localhost:8082/table-login/edit/${editTable.id}`, {
//         tableNumber: editTable.tableNumber.toString(),
//         seat: editTable.seats.toString(),
//         password: editTable.password,
//       });
//       fetchTables();
//       setShowEditForm(false);
//       setEditTable(null);
//     } catch (error) {
//       console.error("Error editing table:", error);
//     }
//   };

//   return (
//     <div className="space-y mb-9 animate-fadeIn">
//       <nav className="text-black py-6 px-6 flex items-center justify-end">
//         <CgProfile className="w-12 h-12 rounded-full border border-gray-300 shadow-lg" />
//       </nav>

//       <div onClick={() => setSelectedTable(null)}>
//         <h1 className="text-3xl font-bold mb-8 flex items-center justify-center">🍽️ Table Management</h1>

//         <div className="grid grid-cols-3 gap-6">
//           <div className="p-4 bg-blue-100 rounded-lg shadow text-center">
//             <h4 className="text-lg font-semibold text-blue-800">Total Tables</h4>
//             <p className="text-2xl font-bold text-blue-900">{tables.length}</p>
//           </div>
//           <div className="p-4 bg-red-100 rounded-lg shadow text-center">
//             <h4 className="text-lg font-semibold text-red-800">Occupied Tables</h4>
//             <p className="text-2xl font-bold text-red-900">{tables.filter((t) => t.status === "Occupied").length}</p>
//           </div>
//           <div className="p-4 bg-green-100 rounded-lg shadow text-center">
//             <h4 className="text-lg font-semibold text-green-800">Available Tables</h4>
//             <p className="text-2xl font-bold text-green-900">{tables.filter((t) => t.status === "Available").length}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-4 mt-4">
//           {tables.map((table) => (
//             <div
//               key={table.id}
//               className="p-6 bg-white rounded-lg shadow-md text-center border border-gray-300 hover:shadow-lg transition duration-300 cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedTable(table);
//               }}
//             >
//               <h3 className="text-lg mb-2 font-semibold">Table {table.id}</h3>
//               <p className={`text-sm font-medium p-1 rounded-md ${table.status === "Available" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
//                 {table.status}
//               </p>
//             </div>
//           ))}
//         </div>

//         {selectedTable && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
//               <h3 className="text-2xl font-bold mb-4">Table {selectedTable.id} Details</h3>
//               <p className="mb-2">Seats: {selectedTable.seat}</p>
//               <p className="mb-2">Password: {selectedTable.password}</p>
//               <p className="mb-2">Status: {selectedTable.status}</p>
//               <div className="space-x-4 mt-4">
//                 <button
//                   className={`px-4 py-2 rounded-md transition ${
//                     selectedTable.status === "Available" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
//                   } text-white`}
//                   onClick={handleStatusChange}
//                 >
//                   {selectedTable.status === "Available" ? "Set as Occupied" : "Set as Available"}
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
//                   onClick={() => setSelectedTable(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TableDashboard;
