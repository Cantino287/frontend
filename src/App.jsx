// // import AdminDashboard from './components/AdminDashboard';
// import './index.css';
// import './styles/AdminDashboard.css';

// import React, {
//   useEffect,
//   useState,
// } from 'react';

// import {
//   Route,
//   Routes,
//   useNavigate,
// } from 'react-router-dom';

// import AdminDashboard from './components/AdminDashboard';
// import Footer from './components/Footer/Footer';
// import LoginPopup from './components/LoginPopup/LoginPopup';
// import Navbar from './components/Navbar/Navbar';
// import QRLogin from './components/QR/QRLogin';
// import Cart from './pages/Cart/Cart';
// import Home from './pages/Home/Home';
// import MyOrders from './pages/MyOrders/MyOrders';
// import PlaceOrder from './pages/PlaceOrder/PlaceOrder';

// const App = () => {


//   const [showLogin,setShowLogin] = useState(false);
//   const [username , setUsername] = useState("");
//   const SomeComponent = () => {
//     const navigate = useNavigate();

//     return <button onClick={() => navigate("/QRLogin")}>Scan QR Code</button>;
// };
//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//         setUsername(storedUsername);
//     }
// }, []);

//   return (
//     <>
//     {showLogin?<LoginPopup setShowLogin={setShowLogin} setUsername={setUsername}/>:<></>}
//     <Routes>
//     <Route path='/adminDashboard' element={<AdminDashboard/>}/>
//     </Routes>
//     <div className='app'>
//       <Navbar setShowLogin={setShowLogin} username={username} setUsername={setUsername}/> 
//       {/* {showLogin && <LoginPopup setShowLogin={setShowLogin} />}  */}
//       <Routes>
//         <Route path='/' element={<Home/>}/>
        
//         <Route path='/cart' element={<Cart/>}/>
//         <Route path="/QRLogin" element={<QRLogin />} /> {/* Add QRLogin Route */}
//         <Route path='/order' element={<PlaceOrder/>}/>
//         <Route path='/myOrders' element={<MyOrders />} />
//       </Routes>
//     </div>
//     <Footer/>
//     </>
    
//   )
//   // return <AdminDashboard />;
// }

import './index.css';
import './styles/AdminDashboard.css';
import 'react-toastify/dist/ReactToastify.css';

// export default App
import React, {
  useEffect,
  useState,
} from 'react';

import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Navbar from './components/Navbar/Navbar';
import QRLogin from './components/QR/QRLogin';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import MyOrders from './pages/MyOrders/MyOrders';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';

const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState("");
    const location = useLocation(); // ✅ Get current path

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    // ✅ Check if the current route is Admin Dashboard
    const isAdminPage = location.pathname.startsWith('/adminDashboard');

    return (
        <>
        <ToastContainer position="top-right" autoClose={1000} />
            {showLogin && <LoginPopup setShowLogin={setShowLogin} setUsername={setUsername} />}
            <div className='app'>
            {!isAdminPage && <Navbar setShowLogin={setShowLogin} username={username} setUsername={setUsername} />} {/* ✅ Hide Navbar for Admin */}
            
            <Routes>
            
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/QRLogin" element={<QRLogin />} />
                <Route path="/order" element={<PlaceOrder />} />
                <Route path="/myOrders" element={<MyOrders />} />
                
                
            </Routes>
            </div>
            <Routes>
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            </Routes>
            {!isAdminPage && <Footer />} {/* ✅ Hide Footer for Admin */}
        </>
    );
};

export default App;
