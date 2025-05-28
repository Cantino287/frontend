import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import { CgProfile } from 'react-icons/cg';
import {
  toast,
  ToastContainer,
} from 'react-toastify';

const DeliInfo = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const previousIds = useRef(new Set());
  const audioRef = useRef(new Audio('/notification.mp3')); // Place sound file in public folder
  const itemsPerPage = 7;

  const totalDeli = deliveries.length;
  const pendingDeli = deliveries.filter(
    (delivery) => delivery.status === "Pending"
  ).length;
  // const availableTables = totalTables - occupiedTables;
  const onWayDeli = deliveries.filter(
    (delivery) => delivery.status === "On Way"
  ).length;  

  const finishDeli = deliveries.filter(
    (delivery) => delivery.status === "Delivered"
  ).length;
  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8082/delivery/all') // Replace with your actual backend API endpoint
  //     .then((response) => {
  //       setDeliveries(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the deliveries!", error);
  //     });
  // }, []);
  // const fetchDeliveries = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8082/delivery/all");
  //     const data = await res.json();
  //     setDeliveries(data);
  //   } catch (err) {
  //     console.error("Failed to fetch deliveries:", err);
  //   }
  // };
  // const fetchDeliveries = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8082/delivery/all');
  //     const newData = response.data;

  //     // Check if any new order exists
  //     const newOrders = deliveries.filter(delivery => !previousIds.current.has(delivery.id));

  //     if (newOrders.length > 0) {
  //       newOrders.forEach(order => {
  //         toast.success(`🚚 New order from ${delivery.name}!`, { autoClose: 3000 });
  //         audioRef.current.play();
  //         previousIds.current.add(order.id);
  //       });
  //     }

  //     setDeliveries(newData);
  //   } catch (error) {
  //     console.error('Error fetching deliveries:', error);
  //   }
  // };
  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('http://localhost:8082/delivery/all');
      const newData = response.data;
  
      // Check if any new order exists in the newly fetched data
      const newOrders = newData.filter(order => !previousIds.current.has(order.id));
  
      if (newOrders.length > 0) {
        newOrders.forEach(order => {
          toast.success(`🚚 New order from ${order.name}!`, { autoClose: 3000 });
          audioRef.current.play();
          previousIds.current.add(order.id);
        });
      }
  
      setDeliveries(newData); // Save the latest deliveries
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };
  

  // useEffect(() => {
  //   // Initial fetch
  //   fetchDeliveries();

  //   // Poll every 10 seconds
  //   const interval = setInterval(fetchDeliveries, 10000);

  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    audioRef.current.load(); // Explicitly load the file
  
    fetchDeliveries(); // Initial fetch
  
    const interval = setInterval(fetchDeliveries, 10000);
    return () => clearInterval(interval);
  }, []);
  
  
  
  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      // delivery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const updateDeliveryStatus = async (id, newStatus) => {
  //   try {
  //     const response = await fetch(`http://localhost:8082/delivery/status/${id}?status=${newStatus}`, {
  //       method: "PUT",
  //     });
  
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(errorText);
  //     }
  
  //     const message = await response.text();
  //     alert(message);
  
  //     // Optional: Refresh deliveries
  //     fetchDeliveries();
  //   } catch (error) {
  //     console.error("Failed to update status:", error.message);
  //     alert("Error: " + error.message);
  //   }
  // };
  // const updateDeliveryStatus = async (id, newStatus) => {
  //   try {
  //     const response = await fetch(`http://localhost:8082/delivery/status/${id}?status=${newStatus}`, {
  //       method: "PUT",
  //     });
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error("Failed to update status:", errorText);
  //       return false;
  //     }
      
  //     console.log("Status update response:", response.status);
      
  //     return response.ok;
  //     toast.success("Status updated successfully!");
      
  //   } catch (error) {
  //     console.error("Error updating delivery status:", error);
  //     return false;
  //   }
  // };
  const updateDeliveryStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8082/delivery/status/${id}?status=${newStatus}`, {
        method: "PUT",
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to update status:", response.status, errorText); // Log more detail
        toast.error("Failed to update status on server.");
        return false;
      }

      toast.success("Status updated successfully!");
      return true;
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error while updating status.");
      return false;
    }
  };
  
  
  
  

  // Paginate deliveries
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeliveries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);

  const handleRowClick = (delivery) => {
    setSelectedDelivery(delivery);
  };

  const handleDelete = (id) => {
    setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
    setSelectedDelivery(null);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setDeliveries(deliveries.map((delivery) => (delivery.id === editData.id ? editData : delivery)));
    setSelectedDelivery(editData);
    setEditMode(false);
  };


  return (
    <div className="space-y mb-6 animate-fadeIn">
      <nav className="text-black py-6 px-6 flex items-center justify-end">
        {/* Profile logo in top-right corner */}
        <div className="relative">
          <CgProfile className="w-12 h-12 rounded-full border border-gray-300 shadow-lg" />
        </div>
      </nav>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-9 text-center">🚚 Deliveries Information</h2>
        <div className="grid grid-cols-4 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow text-center">
          <h4 className="text-lg font-semibold text-blue-800">Total Orders</h4>
          <p className="text-2xl font-bold text-blue-900">{totalDeli}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg shadow text-center">
          <h4 className="text-lg font-semibold text-red-800">
            Pending Orders
          </h4>
          <p className="text-2xl font-bold text-red-900">{pendingDeli}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow text-center">
          <h4 className="text-lg font-semibold text-yellow-800">
            On Way Orders
          </h4>
          <p className="text-2xl font-bold text-yellow-900">{onWayDeli}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow text-center">
          <h4 className="text-lg font-semibold text-green-800">
            Delivered Orders
          </h4>
          <p className="text-2xl font-bold text-green-900">{finishDeli}</p>
        </div>
      </div>
<br></br>
        <input
          type="text"
          placeholder="Search by ID or Name...                                                                                                     🔍"
          className="w-[50%] border items-center ml-[340px] pl-6 rounded-md p-2 mb-9"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value.toLowerCase());
            setCurrentPage(1);
          }}
        />

        {filteredDeliveries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr  className="bg-gray-800 text-white">
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Total Amount</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Payment Method</th>
                </tr>
              </thead>
              
              <tbody>
                {currentItems.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className="border-t cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRowClick(delivery)}
                  >
                    <td className="py-2 px-4 text-center">{delivery.id}</td>
                    <td className="py-2 px-4 text-center">{delivery.name}</td>
                    <td className="py-2 px-4 text-center">{delivery.orderDate}</td>
                    <td className="py-2 px-4 text-center">{delivery.orderTime}</td>
                    <td className="py-2 px-4 text-center">{delivery.totalAmount}</td>
                    <td className="py-2 px-4 text-center">{delivery.status}</td>
                    <td className="py-2 px-4 text-center">{delivery.paymentMethod}</td>
                 </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-red-500 font-bold text-lg mt-4"></p>
        )}

        <div className="flex justify-center mt-4 space-x-2">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="px-4 py-2 rounded-md border bg-gray-200 hover:bg-gray-300 disabled:opacity-50" disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md border ${currentPage === page ? "bg-gray-800 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {page}
            </button>
          ))}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="px-4 py-2 rounded-md border bg-gray-200 hover:bg-gray-300 disabled:opacity-50" disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        
        {selectedDelivery && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4">Delivery Details</h3>
      <div className="mb-4">
        <p><strong>Name :</strong> {selectedDelivery.name}</p>
        <p><strong>Email :</strong> {selectedDelivery.email}</p>
        <p><strong>Address :</strong> {selectedDelivery.street}</p>
        <p><strong>Phone :</strong> {selectedDelivery.phone}</p>
        <p><strong>Total Amount :</strong> {selectedDelivery.totalAmount} - Kyats</p>
        <p><strong>Payment Method :</strong> {selectedDelivery.paymentMethod}</p>
        <p><strong>Date :</strong> {selectedDelivery.orderDate}</p>
        <p><strong>Time :</strong> {selectedDelivery.orderTime}</p>

        <h4 className="mt-4 font-semibold">Ordered Products :</h4>
        <ul className="list-disc list-inside">
          {selectedDelivery.orderedProducts && selectedDelivery.orderedProducts.map((product, index) => (
            <li key={index}>
              {product.productName} (Qty: {product.quantity})
            </li>
          ))}
        </ul>
        <br></br>
        <label className="block font-semibold mb-1">Status :</label>
    {/* <select
      value={selectedDelivery.status}
      
      onChange={async (e) => {
        const newStatus = e.target.value;
      
        // Update UI first
        setSelectedDelivery((prev) => ({
          ...prev,
          status: newStatus,
        }));
      
        // Then attempt backend update (optional but recommended)
        const success = await updateDeliveryStatus(selectedDelivery.id, newStatus);
      
        if (!success) {
          alert("Failed to update status on server.");
          // Optionally revert the change
        }
      }}
      
      className="border rounded-md px-2 py-1"
    >
      <option value="Pending">Pending</option>
      <option value="On Way">On Way</option>
      <option value="Delivered">Delivered</option>
    </select> */}
    <select
  value={selectedDelivery.status}
  onChange={async (e) => {
    const newStatus = e.target.value;

    // ✅ 1. Update selectedDelivery state
    setSelectedDelivery((prev) => ({
      ...prev,
      status: newStatus,
    }));

    // ✅ 2. Update the main deliveries list to reflect the status change in the table
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.id === selectedDelivery.id
          ? { ...delivery, status: newStatus }
          : delivery
      )
    );

    // ✅ 3. Update backend
    const success = await updateDeliveryStatus(selectedDelivery.id, newStatus);
    if (!success) {
      alert("Failed to update status on server.");
      // Optionally revert the change in both selectedDelivery and deliveries
    }
  }}
  className="border rounded-md px-2 py-1"
>
  <option value="Pending">Pending</option>
  <option value="On Way">On Way</option>
  <option value="Delivered">Delivered</option>
</select>

   
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={() => setSelectedDelivery(null)} className="bg-gray-500 text-white px-3 py-1 rounded-md">Close</button>
      </div>
    </div>
  </div>
)}

      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

    </div>
  );
};

export default DeliInfo;