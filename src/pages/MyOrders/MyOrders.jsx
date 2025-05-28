

// import './MyOrders.css';

// import React, {
//   useContext,
//   useEffect,
//   useState,
// } from 'react';

// import axios from 'axios';

// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../context/StoreContext';

// const MyOrders = () => {
//     const { cartItems } = useContext(StoreContext);
//     const [orders, setOrders] = useState([]);
//     const [email, setEmail] = useState(""); // User's email for fetching orders

//     // Fetch orders from backend using email
//     const fetchOrders = async () => {
//         if (!email) return;

//         try {
//             const response = await axios.get(`http://localhost:8082/delivery/getByEmail`, {
//                 params: { email },
//             });

//             setOrders(response.data);
//         } catch (error) {
//             console.error("❌ Error fetching orders:", error);
//         }
//     };

//     // Fetch orders when email is entered
//     useEffect(() => {
//         if (email) fetchOrders();
//     }, [email]);

//     return (
//         <div className='my-orders'>
//             <h2>My Orders</h2>
//             {/* Email Input to Fetch Orders */}
//             <div className="email-input">
//                 <input
//                     type="email"
//                     placeholder="Enter your email to track orders"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <button onClick={fetchOrders}>Fetch Orders</button>
//             </div>

//             <div className="container">
//                 {orders.length === 0 ? (
//                     <p>No orders found. Please enter your email.</p>
//                 ) : (
//                     orders.map((order, index) => (
//                         <div key={index} className="my-orders-order">
//                             <img src={assets.parcel_icon} alt="Parcel Icon" />
//                             <p><b>Order ID:</b> {order.id}</p>
//                             <p><b>Items:</b> {cartItems && Object.values(cartItems).map((item) => `${item.name} x${item.quantity}`).join(", ")}</p>
//                             <p><b>Total:</b> {order.totalAmount} MMK</p>
//                             <p><b>Status:</b> <span>&#x25cf;</span> <b>Pending</b></p>
//                             <button onClick={fetchOrders}>Track Order</button>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyOrders;

import './MyOrders.css';
import { FcPhone } from "react-icons/fc";

import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { BsTelephoneForwardFill } from "react-icons/bs";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useStore } from '../../context/StoreContext';
import { FaPhone } from "react-icons/fa6";



const MyOrders = () => {
  const { cartItems, userEmail } = useContext(StoreContext); // Get userEmail from context
  const [orders, setOrders] = useState([]);
 
  

  // Fetch orders using logged-in user's email
  const fetchOrders = async () => {
    if (!userEmail) {
      console.log("❌ No email found in context!");
      return;
    }// Ensure email is available

    try {
      console.log(`Fetching orders for: ${userEmail}`);
      const response = await axios.get(`http://localhost:8082/delivery/getByEmail`, {
        params: { email: userEmail },
      });
      console.log("✅ Orders fetched:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    }
  };
  const [selectedDelivery, setSelectedOrder] = useState(null);

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
  };
  const statusSteps = ["Pending", "On Way", "Delivered"];



  // Automatically fetch orders on mount
  useEffect(() => {
    if (userEmail) fetchOrders();
    const intervalId = setInterval(() => {
      fetchOrders();
    }, 1000); // every 1 second

    // Cleanup when component unmounts or userEmail changes
    return () => clearInterval(intervalId);
  }, [userEmail]);
  // useEffect(() => {
  //     fetchOrders();
  // }, [userEmail]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>

      <div className="container">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p><b>Order ID:</b> {order.id}</p>

              {/* ✅ Fix: Use order.orderedProducts instead of order.items */}
              <p><b>Items:</b> {
                Array.isArray(order.orderedProducts) && order.orderedProducts.length > 0
                  ? order.orderedProducts.map((item) => `${item.productName} x${item.quantity}`).join(", ")
                  : "No items found"
              }</p>
              <p><b>Total:</b> {order.totalAmount} Ks</p>
              {/* <p><b>Status:</b> <span>&#x25cf;</span> <b>Pending</b></p> */}
              <p><b>Status:</b> <span>&#x25cf;</span> <b>{order.status || "Pending"}</b></p>
              {/* <button className="call-button">
                <a href={`tel:${order.phoneNumber}`}>
                   Call Delivery
                </a>
              </button> */}
              <button
  className="call-button flex items-center gap-2 bg-gray-200  px-4 py-2 rounded hover:bg-blue-100 transition duration-300 ease-in-out"
  onClick={() => {
    if (order.shop?.phone) {
      window.location.href = `tel:${order.shop.phone}`;
      console.log(`Calling number: ${order.shop.phone}`);

    } else {
      alert('Phone number not available');
    }
  }}
>
{/* <span>Call</span> */}
<FaPhone color="#4CAF50" className="text-xl" />   
</button>
            </div>
          ))

        )}
        {/* {selectedDelivery && (
          <div className="timeline-container mt-6">
            <h2 className="text-lg font-bold mb-4">Delivery Progress</h2>
            <div className="timeline">
              {statusSteps.map((step, idx) => {
                const isActive = statusSteps.indexOf(selectedDelivery.status) >= idx;
                return (
                  <div key={idx} className="timeline-item flex items-start mb-4">
                    <div
                      className={`timeline-icon w-5 h-5 rounded-full mr-4 ${isActive ? "bg-red-500" : "bg-gray-300"
                        }`}
                    ></div>
                    <div className="timeline-content">
                      <p className={`font-semibold ${isActive ? "text-red-600" : "text-gray-500"}`}>
                        Delivery - {step}
                      </p>
                      <p className="text-sm text-gray-400">
                        {step === selectedDelivery.status ? "Current Status" : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )} */}


      </div>
    </div>
  );
};

export default MyOrders;
