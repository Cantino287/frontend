import './Navbar.css';

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({  setShowLogin,username,setUsername }) => {
  
  const [menu, setMenu] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  
  const handleLogout = () => {
    setUsername(""); // Clear username state
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail"); // Optional: also clear stored email
    localStorage.removeItem("token");     // ✅ Remove the stored token
    localStorage.removeItem("isAdmin");   // Optional: if you want to clear admin status too

    navigate("/"); // Redirect to home or login page
};

    useEffect(() => {
      function handleClickOutside(event) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setDropdownOpen(false);
          }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, []); // ✅ Remove username from localStorage


  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        
         {username && (
                    <Link to='/myorders' onClick={() => setMenu("myorders")} className={menu === "myorders" ? "active" : ""}>
                        My Orders
                    </Link>
                )}
        
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <div className="narbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        
        {!username ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon}
             alt="Profile" 
             className="icon"
             onClick={() => setDropdownOpen(!isDropdownOpen)}

             />
            <ul className="nav-profile-dropdown">
              {/* <li onClick={()=>navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" />
                Orders
              </li>
              <hr /> */}
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="Logout" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Show the login popup if not logged in and showLogin is true
      {!isLoggedIn && showLogin && <LoginPopup onLogin={handleLogin} />} */}
    </div>
  );
};

export default Navbar;

// import './Navbar.css';

// import React, {
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';

// import {
//   Link,
//   useNavigate,
// } from 'react-router-dom';

// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../context/StoreContext';

// const Navbar = ({ setShowLogin, username, setUsername }) => {
//   const [menu, setMenu] = useState("home");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const { getTotalCartAmount, products } = useContext(StoreContext); // ✅ Fetch products from context
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
  
//   const [input, setInput] = useState("");
//   const [filteredFoodList, setFilteredFoodList] = useState([]);
//   const [noResults, setNoResults] = useState(false);

//   useEffect(() => {
//     if (products && products.length > 0) {
//       let newList = products.filter((item) =>
//         item.name.toLowerCase().includes(input.toLowerCase())
//       );

//       setFilteredFoodList(newList); // ✅ Update filtered list

//       // ✅ Handle empty results
//       if (newList.length === 0 && input !== '') {
//         setNoResults(true);
//       } else {
//         setNoResults(false);
//       }
//     }
//   }, [input, products]);

//   const handleSearch = (e) => {
//     setInput(e.target.value); // ✅ Update the input state
//   };

//   const handleSelectProduct = (productId) => {
//     setInput(""); // ✅ Clear search input
//     setFilteredFoodList([]); // ✅ Clear search results
//     navigate(`/product/${productId}`); // ✅ Navigate to product page
//   };
//   const handleLogout = () => {
//         setUsername(""); // Clear username state
//         localStorage.removeItem("username");
//         navigate("/");
//       };
//         useEffect(() => {
//           function handleClickOutside(event) {
//               if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                   setDropdownOpen(false);
//               }
//           }
//           document.addEventListener("mousedown", handleClickOutside);
//           return () => {
//               document.removeEventListener("mousedown", handleClickOutside);
//           };
//       }, []); 

//   return (
//     <div className='navbar'>
//       <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      
//       <ul className="navbar-menu">
//         <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
//         {username && (
//           <Link to='/myorders' onClick={() => setMenu("myorders")} className={menu === "myorders" ? "active" : ""}>
//             My Orders
//           </Link>
//         )}
//       </ul>

//       <div className="navbar-right">
      
//         {/* <div className="navbar-search">
//           <input 
//             type="text"
//             placeholder="Search products..."
//             value={input}
//             onChange={handleSearch}
//           />
//           <img src={assets.search_icon} alt="Search" />
          
      
//           {input && (
//             <ul className="search-results">
//               {filteredFoodList.length > 0 ? (
//                 filteredFoodList.map(product => (
//                   <li key={product.id} onClick={() => handleSelectProduct(product.id)}>
//                     {product.name}
//                   </li>
//                 ))
//               ) : (
//                 noResults && <li className="no-results">No Results Found</li>
//               )}
//             </ul>
//           )}
//         </div> */}

//         <div className="navbar-cart">
//           <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
//           <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
//         </div>

//         {!username ? (
//           <button onClick={() => setShowLogin(true)}>Sign In</button>
//         ) : (
//           <div className="navbar-profile">
//             <img src={assets.profile_icon} alt="Profile" className="icon" />
//             <ul className="nav-profile-dropdown">
//               {/* <li onClick={() => navigate('/myorders')}>
//                 <img src={assets.bag_icon} alt="Orders" />
//                 Orders
//               </li>
//               <hr /> */}
//               <li onClick={handleLogout}>
//                 <img src={assets.logout_icon} alt="Logout" />
//                 Logout
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

