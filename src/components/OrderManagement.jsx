import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';

const OrderManagement = () => {
    const [orders, setOrders] = useState([
      { id: 1, customer: "Alice", status: "Pending", time: "12:00 PM", table_number: 5, items: [{ name: "Pizza", quantity: 2, price: "$10" }, { name: "Pasta", quantity: 1, price: "$5" }], taxes: "$2.50", total: "$25.50" },
      { id: 2, customer: "Bob", status: "Completed", time: "12:30 PM", table_number: 3, items: [{ name: "Burger", quantity: 1, price: "$8" }, { name: "Fries", quantity: 2, price: "$3" }], taxes: "$1.50", total: "$15.50" },
      { id: 3, customer: "Charlie", status: "Pending", time: "1:00 PM", table_number: 7, items: [{ name: "Salad", quantity: 1, price: "$7" }, { name: "Soup", quantity: 2, price: "$6" }], taxes: "$2.00", total: "$20.00" },
      { id: 4, customer: "David", status: "Canceled", time: "1:30 PM", table_number: 2, items: [{ name: "Steak", quantity: 1, price: "$25" }, { name: "Mashed Potatoes", quantity: 1, price: "$5" }], taxes: "$3.00", total: "$30.00" }
    ]);
    //new functions added area----
  
    const calculateTotal = (items, taxes) => {
      const subtotal = items.reduce((sum, item) => sum + item.quantity * parseFloat(item.price.replace('$', '')), 0);
      const total = subtotal + parseFloat(taxes.replace('$', ''));
      return `$${total.toFixed(2)}`;
    };
  
  
  
    const [selectedOrder, setSelectedOrder] = useState(null);
  
  
    const showOrderDetails = (order) => {
      const updatedOrder = { ...order, total: calculateTotal(order.items, order.taxes) };
      setSelectedOrder(updatedOrder);
    };
  
  
    const closePopup = () => {
      setSelectedOrder(null);
    };
  
  
  
  
  
    //area ended--------
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(
      (order) => order.status === "Pending"
    ).length;
    const completedOrders = orders.filter(
      (order) => order.status === "Completed"
    ).length;
    const canceledOrders = orders.filter(
      (order) => order.status === "Canceled"
    ).length;
    const completionRate = (completedOrders / totalOrders) * 100;
  
    const updateOrderStatus = (id, newStatus) => {
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    };
  
    return (
      <div className="space-y animate-fadeIn">
        <nav className="text-black py-6 px-6 flex items-center justify-end">
          {/* Profile logo in top-right corner */}
          <div className="relative">
            <CgProfile className="w-12 h-12 rounded-full border border-gray-300 shadow-lg" />
          </div>
        </nav>
        <h2 className="text-3xl mb-9 font-bold text-center text-gray-800">📦 Order Management</h2>
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-4 gap-6">
            <div className="p-4 bg-blue-100 rounded-lg shadow text-center">
              <h4 className="text-lg font-semibold text-blue-800">Total Orders</h4>
              <p className="text-2xl font-bold text-blue-900">{totalOrders}</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg shadow text-center">
              <h4 className="text-lg font-semibold text-yellow-800">
                Pending Orders
              </h4>
              <p className="text-2xl font-bold text-yellow-900">{pendingOrders}</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow text-center">
              <h4 className="text-lg font-semibold text-green-800">
                Completed Orders
              </h4>
              <p className="text-2xl font-bold text-green-900">{completedOrders}</p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg shadow text-center">
              <h4 className="text-lg font-semibold text-red-800">
                Canceled Orders
              </h4>
              <p className="text-2xl font-bold text-red-900">{canceledOrders}</p>
            </div>
          </div>
  
          <h2 className="text-2xl font-bold mb-4">Order List</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-3 items-center p-4 border-b cursor-pointer hover:bg-gray-100"
                onClick={(e) => {
                  if (!e.target.closest('button')) {
                    showOrderDetails(order);
                  }
                }}
              >
                <span className="w-full text-left">
                  {order.customer} - {order.time}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-white w-24 text-center mx-auto ${order.status === "Pending"
                    ? "bg-yellow-500"
                    : order.status === "Completed"
                      ? "bg-green-500"
                      : "bg-red-500"
                    }`}
                >
                  {order.status}
                </span>
                <div className="w-full flex justify-end space-x-2">
                  {order.status === "Pending" && (
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                      onClick={() => updateOrderStatus(order.id, "Completed")}
                    >
                      Complete
                    </button>
                  )}
                  {order.status === "Pending" && (
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      onClick={() => updateOrderStatus(order.id, "Canceled")}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] text-center">
                <h3 className="text-3xl font-bold mb-6"> Receipt</h3>
                <div className="text-lg font-medium mb-4">Table Number: <span className="bg-blue-500 text-white px-4 py-1 rounded-lg">{selectedOrder.table_number}</span></div>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="grid grid-cols-3 text-lg font-semibold">
                  <span className="text-left">Item</span>
                  <span className="text-center">Qty</span>
                  <span className="text-right">Price</span>
                </div>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-3 text-lg py-2">
                    <span className="text-left">{item.name}</span>
                    <span className="text-center">{item.quantity}</span>
                    <span className="text-right">{item.price}</span>
                  </div>
                ))}
                <div className="border-t border-gray-300 my-4"></div>
                <div className="flex justify-between text-lg font-medium">
                  <span>Taxes:</span>
                  <span>{selectedOrder.taxes}</span>
                </div>
                <div className="border-t border-gray-300 my-4"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>{selectedOrder.total}</span>
                </div>
                <button
                  className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 text-lg font-semibold"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          )}
  
          <div className="mt-4 bg-gray-300 rounded-lg overflow-hidden">
            <div
              className="bg-blue-500 text-white text-center py-1 text-sm font-medium"
              style={{ width: `${completionRate}%` }}
            >
              {Math.round(completionRate)}% Orders Completed
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default OrderManagement;
