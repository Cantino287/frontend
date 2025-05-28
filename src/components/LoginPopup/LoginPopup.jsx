// import './LoginPopup.css';

// import React, {
//   useContext,
//   useState,
// } from 'react';

// import { useNavigate } from 'react-router-dom'; // ✅ Import for navigation

// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../context/StoreContext';

// import { useStore } from '../../context/StoreContext';

// const LoginPopup = ({ setShowLogin, setUsername }) => {
//     const navigate = useNavigate(); // ✅ Initialize navigation
//     const [currState, setCurrState] = useState("Login");
//     const { setUserEmail } = useContext(StoreContext);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [contactNumber, setContactNumber] = useState("");
//     const [error, setError] = useState("");

//     // Define admin credentials
//     const adminEmail = "kokolay@mailinator.com";
//     const adminPassword = "210404";
//     const { shopId, setShopId, cartItems, setCartItems } = useStore();
//     // Function to handle login/signup request
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(""); // Clear previous errors

//         // Validate email format
//         if (!email.includes("@")) {
//             alert("Invalid email format!");
//             return;
//         }

//         let finalUsername = name;
//         if (currState === "Login") {
//             finalUsername = email.split("@")[0];
//         } else if (currState === "Sign Up" && name.trim() === "") {
//             alert("Please enter your name!");
//             return;
//         }

//         setUsername(finalUsername);
//         localStorage.setItem("username", finalUsername);
//         setUserEmail(email);
//         localStorage.setItem("userEmail", email);

//         // Check if the user is an admin
//         if (currState === "Login" && email === adminEmail && password === adminPassword) {
//             alert("Admin login successful!");
//             localStorage.setItem("isAdmin", "true"); // ✅ Store admin session
//             setShowLogin(false);
//             navigate("../adminDashboard"); // ✅ Redirect to admin dashboard
//             return;
//         }

       
//         const endpoint = currState === "Login" ? "/user/login" : "/user/signup";
//         const payload = currState === "Login"
//             ? { email, password }
//             : { name, contactNumber, email, password };

//         try {
//             const response = await fetch(`http://localhost:8082${endpoint}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(payload)
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 alert(`${currState} successful!`);
//                 setShowLogin(false); // Close popup on success
//             } else {
//                 setError(data.message || "Something went wrong");
//             }
//         } catch (err) {
//             setError("Failed to connect to the server");
//         }
//     };

//     return (
//         <div className='login-popup'>
//             <form onSubmit={handleSubmit} className="login-popup-container">
//                 <div className="login-popup-title">
//                     <h2>{currState}</h2>
//                     <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
//                 </div>
//                 <div className="login-popup-inputs">
//                     {currState === "Sign Up" && (
//                         <>
//                             <input 
//                                 type="text" 
//                                 placeholder='Your name' 
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required 
//                             />
//                             <input 
//                                 type="text" 
//                                 placeholder='Your no.' 
//                                 value={contactNumber}
//                                 onChange={(e) => setContactNumber(e.target.value)}
//                                 required 
//                             />
//                         </>
//                     )}
//                     <input 
//                         type="email" 
//                         placeholder='Your email' 
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required 
//                     />
//                     <input 
//                         type="password" 
//                         placeholder='Password' 
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required 
//                     />
//                 </div>
//                 {error && <p className="error-message">{error}</p>}
//                 <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
//                 <div className="login-popup-condition">
//                     <input type="checkbox" required />
//                     <p>By continuing, I agree to the terms of use & privacy policy.</p>
//                 </div>
//                 {currState === "Login"
//                     ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
//                     : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
//                 }
//             </form>
//         </div>
//     );
// };

// export default LoginPopup;

// // import './LoginPopup.css';

// // import React, {
// //   useContext,
// //   useState,
// // } from 'react';

// // import { jwtDecode } from 'jwt-decode'; // ✅ Correct import
// // import { useNavigate } from 'react-router-dom'; // ✅ Import navigation

// // import { assets } from '../../assets/assets';
// // import { StoreContext } from '../../context/StoreContext';

// // const LoginPopup = ({ setShowLogin, setUsername }) => {
// //     const navigate = useNavigate(); // ✅ Initialize navigation
// //     const [currState, setCurrState] = useState("Login");
// //     const { setUserEmail } = useContext(StoreContext);
// //     const [name, setName] = useState("");
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [contactNumber, setContactNumber] = useState("");
// //     const [error, setError] = useState("");

// //     // Function to handle login/signup request
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setError(""); // Clear previous errors

// //         // Validate email format
// //         if (!email.includes("@")) {
// //             alert("Invalid email format!");
// //             return;
// //         }

// //         let finalUsername = name;
// //         if (currState === "Login") {
// //             finalUsername = email.split("@")[0];
// //         } else if (currState === "Sign Up" && name.trim() === "") {
// //             alert("Please enter your name!");
// //             return;
// //         }

// //         setUsername(finalUsername);
// //         localStorage.setItem("username", finalUsername);
// //         setUserEmail(email);
// //         localStorage.setItem("userEmail", email);

// //         const endpoint = currState === "Login" ? "/user/login" : "/user/signup";
// //         const payload =
// //             currState === "Login"
// //                 ? { email, password }
// //                 : { name, contactNumber, email, password };

// //         try {
// //             const response = await fetch(`http://localhost:8082${endpoint}`, {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //                 body: JSON.stringify(payload),
// //             });

// //             const data = await response.json();
// //             console.log("Login response:", data); // ✅ Debugging

// //             if (response.ok) {
// //                 // ✅ Store JWT token
// //                 localStorage.setItem("token", data.token);
// //                 const decodedToken = jwtDecode(token);
// //                 console.log("Decoded Token:", decodedToken);
// //                 const userRole = decodedToken.role || "UNKNOWN";

// //                 // ✅ Role-based navigation
// //                 if (userRole === "admin") {
// //                     localStorage.setItem("isAdmin", "true");
// //                     alert("Admin login successful!");
// //                     navigate("/adminDashboard");
// //                 } else if (userRole === "user") {
// //                     localStorage.setItem("isAdmin", "false");
// //                     alert("User login successful!");
// //                     navigate("/");
// //                 } else {
// //                     alert("Unknown role! Cannot redirect.");
// //                 }

// //                 setShowLogin(false); // ✅ Close popup on success
// //             } else {
// //                 setError(data.message || "Something went wrong");
// //             }
// //         } catch (err) {
// //             setError("Failed to connect to the server");
// //         }
// //     };

// //     return (
// //         <div className="login-popup">
// //             <form onSubmit={handleSubmit} className="login-popup-container">
// //                 <div className="login-popup-title">
// //                     <h2>{currState}</h2>
// //                     <img
// //                         onClick={() => setShowLogin(false)}
// //                         src={assets.cross_icon}
// //                         alt="Close"
// //                     />
// //                 </div>
// //                 <div className="login-popup-inputs">
// //                     {currState === "Sign Up" && (
// //                         <>
// //                             <input
// //                                 type="text"
// //                                 placeholder="Your name"
// //                                 value={name}
// //                                 onChange={(e) => setName(e.target.value)}
// //                                 required
// //                             />
// //                             <input
// //                                 type="text"
// //                                 placeholder="Your no."
// //                                 value={contactNumber}
// //                                 onChange={(e) => setContactNumber(e.target.value)}
// //                                 required
// //                             />
// //                         </>
// //                     )}
// //                     <input
// //                         type="email"
// //                         placeholder="Your email"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         required
// //                     />
// //                     <input
// //                         type="password"
// //                         placeholder="Password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                     />
// //                 </div>
// //                 {error && <p className="error-message">{error}</p>}
// //                 <button type="submit">
// //                     {currState === "Sign Up" ? "Create account" : "Login"}
// //                 </button>
// //                 <div className="login-popup-condition">
// //                     <input type="checkbox" required />
// //                     <p>By continuing, I agree to the terms of use & privacy policy.</p>
// //                 </div>
// //                 {currState === "Login" ? (
// //                     <p>
// //                         Create a new account?{" "}
// //                         <span onClick={() => setCurrState("Sign Up")}>Click here</span>
// //                     </p>
// //                 ) : (
// //                     <p>
// //                         Already have an account?{" "}
// //                         <span onClick={() => setCurrState("Login")}>Login here</span>
// //                     </p>
// //                 )}
// //             </form>
// //         </div>
// //     );
// // };

// // export default LoginPopup;



import './LoginPopup.css';

import React, {
  useContext,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom'; // ✅ Import for navigation

import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

import { useStore } from '../../context/StoreContext';


const LoginPopup = ({ setShowLogin, setUsername }) => {
    const navigate = useNavigate();
    const [currState, setCurrState] = useState("Login");
    const { setUserEmail } = useContext(StoreContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [error, setError] = useState("");

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);


    const adminEmail = "kokolay@mailinator.com";
    const adminPassword = "210404";

    const { shopId, setShopId, cartItems, setCartItems } = useStore();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");

//         if (!email.includes("@")) {
//             alert("Invalid email format!");
//             return;
//         }

//         let finalUsername = name;
//         if (currState === "Login") {
//             finalUsername = email.split("@")[0];
//         } else if (currState === "Sign Up" && name.trim() === "") {
//             alert("Please enter your name!");
//             return;
//         }

//         setUsername(finalUsername);
//         localStorage.setItem("username", finalUsername);
//         setUserEmail(email);
//         localStorage.setItem("userEmail", email);

//         if (currState === "Login" && email === adminEmail && password === adminPassword) {
//             alert("Admin login successful!");
//             localStorage.setItem("isAdmin", "true");
//             setShowLogin(false);
//             navigate("../adminDashboard");
//             return;
//         }

//         const endpoint = currState === "Login" ? "/user/login" : "/user/signup";
//         const payload = currState === "Login"
//             ? { email, password }
//             : { name, contactNumber, email, password };

//         try {
//             const response = await fetch(`http://localhost:8082${endpoint}`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload)
//             });

//             const data = await response.json();

//             // if (response.ok) {
//             //     if (data.token) {
//             //         localStorage.setItem("token", data.token);
//             //         console.log("✅ Token saved:", data.token);
//             //     }
//             //     alert(`${currState} successful!`);
//             //     setShowLogin(false);
//             // } else {
//             //     setError(data.message || "Something went wrong");
//             // }
//            if (response.ok && data.token) {
//     localStorage.setItem("token", data.token);
//     console.log("✅ Token saved:", data.token);
//     alert(`${currState} successful!`);
//     setShowLogin(false);
// } else {
//     setError(data.message || "Invalid login credentials");
// }
//         } catch (err) {
//             setError("Failed to connect to the server");
//         }
//     };




// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");

//   // Basic validation
//   if (!email.includes("@")) {
//     alert("Invalid email format!");
//     return;
//   }

//   if (currState === "Sign Up" && name.trim() === "") {
//     alert("Please enter your name!");
//     return;
//   }

//   // Admin shortcut login check
//   if (
//     currState === "Login" &&
//     email === adminEmail &&
//     password === adminPassword
//   ) {
//     alert("Admin login successful!");
//     const adminName = email.split("@")[0];
//     localStorage.setItem("username", adminName);
//     localStorage.setItem("userEmail", email);
//     localStorage.setItem("isAdmin", "true");
//     setUsername(adminName);
//     setUserEmail(email);
//     setShowLogin(false);
//     navigate("../adminDashboard");
//     return;
//   }

//   const endpoint = currState === "Login" ? "/user/login" : "/user/signup";
//   const payload =
//     currState === "Login"
//       ? { email, password }
//       : { name, contactNumber, email, password };

//   try {
//     const response = await fetch(`http://localhost:8082${endpoint}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await response.json();

//     if (response.ok && data.token) {
//       localStorage.setItem("token", data.token);
//       console.log("✅ Token saved:", data.token);

//       const finalUsername =
//         currState === "Login" ? email.split("@")[0] : name.trim();

//       localStorage.setItem("username", finalUsername);
//       localStorage.setItem("userEmail", email);
//       setUsername(finalUsername);
//       setUserEmail(email);

//       alert(`${currState} successful!`);
//       setShowLogin(false);
//     } else {
//       setError(data.message || "Invalid login credentials");
//     }
//   } catch (err) {
//     console.error("❌ Error during login/signup:", err);
//     setError("Failed to connect to the server");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  // Basic validation
  if (!email.includes("@")) {
    alert("Invalid email format!");
    return;
  }

  if (currState === "Sign Up" && name.trim() === "") {
    alert("Please enter your name!");
    return;
  }

  // Admin shortcut login check
  if (
    currState === "Login" &&
    email === adminEmail &&
    password === adminPassword
  ) {
    alert("Admin login successful!");
    const adminName = email.split("@")[0];
    localStorage.setItem("username", adminName);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("isAdmin", "true");
    setUsername(adminName);
    setUserEmail(email);
    setShowLogin(false);
    navigate("../adminDashboard");
    return;
  }

  const endpoint = currState === "Login" ? "/user/login" : "/user/signup";
  const payload =
    currState === "Login"
      ? { email, password }
      : { name, contactNumber, email, password };

  try {
    const response = await fetch(`http://localhost:8082${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      if (currState === "Sign Up") {
        // Auto-login after successful signup
        const loginResponse = await fetch("http://localhost:8082/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok && loginData.token) {
          localStorage.setItem("token", loginData.token);
          const finalUsername = name.trim();
          localStorage.setItem("username", finalUsername);
          localStorage.setItem("userEmail", email);
          setUsername(finalUsername);
          setUserEmail(email);
          alert("Sign Up & Auto Login successful!");
          setShowLogin(false);
        } else {
          setError(loginData.message || "Auto login failed after sign-up.");
        }
      } else if (data.token) {
        // Normal login
        localStorage.setItem("token", data.token);
        const finalUsername = email.split("@")[0];
        localStorage.setItem("username", finalUsername);
        localStorage.setItem("userEmail", email);
        setUsername(finalUsername);
        setUserEmail(email);
        alert("Login successful!");
        setShowLogin(false);
      } else {
        setError(data.message || "Login failed");
      }
    } else {
      setError(data.message || "Something went wrong.");
    }
  } catch (err) {
    console.error("❌ Error during login/signup:", err);
    setError("Failed to connect to the server");
  }
};

    const handleForgotPassword = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8082/user/forgotPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await response.text();
            if (response.ok) {
                alert("OTP was sent to your email.");
                setOtpSent(true);
            } else {
                alert(`Failed: ${data}`);
            }
        } catch (err) {
            alert("Failed to connect to the server");
        }
        finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await fetch("http://localhost:8082/user/resetPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword })
            });

            const data = await response.text();
            if (response.ok) {
                alert("Password reset successful! Please log in with your new password.");
                setCurrState("Login");
                setOtpSent(false);
                setOtp("");
                setNewPassword("");
            } else {
                alert(`Failed: ${data}`);
            }
        } catch (err) {
            alert("Failed to connect to the server");
        }
    };
    return (
        
        <div className='login-popup'>
            {loading && (
            <div className="loading-overlay">
                <div className="spinner" />
                <p>Sending OTP...</p>
            </div>
        )}
            <form onSubmit={handleSubmit} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState === "ForgotPassword" ? "Forgot Password" : currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
    
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <>
                            <input 
                                type="text" 
                                placeholder='Your name' 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                            <input 
                                type="text" 
                                placeholder='Your no.' 
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                required 
                            />
                            <p style={{ color: 'red', fontSize: '13.5px', marginBottom: '4px' }}>
                                Fill your email correctly, Otherwise Invoice will not get.
                            </p>
                        </>
                    )}
    
                    <input 
                        type="email" 
                        placeholder='Your email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
    
                    {/* Password input only for Login / Sign Up */}
                    {currState !== "ForgotPassword" && (
                        <input 
                            type="password" 
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    )}
    
                    {/* OTP + New Password fields for ForgotPassword */}
                    {currState === "ForgotPassword" && otpSent && (
                        <>
                            <input 
                                type="text" 
                                placeholder='Enter OTP' 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required 
                            />
                            <input 
                                type="password" 
                                placeholder='New Password' 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required 
                            />
                        </>
                    )}
                </div>
    
                {error && <p className="error-message">{error}</p>}
    
                {/* Submit button for Login / Sign Up */}
                {(currState !== "ForgotPassword") && (
                    <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                )}
    
                {/* Buttons for Forgot Password flow */}
                {currState === "ForgotPassword" && (
                    <>
                        {!otpSent ? (
                            <button type="button" onClick={handleForgotPassword}>Send OTP</button>
                        ) : (
                            <button type="button" onClick={handleResetPassword}>Reset Password</button>
                        )}
                    </>
                )}
    
    {currState !== "ForgotPassword" && (
    <div className="login-popup-condition">
        <input type="checkbox" required />
        <p>By continuing, I agree to the terms of use & privacy policy.</p>
    </div>
)}


    
                {/* Navigation links */}
                {currState === "Login" && (
                    <>
                        <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                        <p><span onClick={() => setCurrState("ForgotPassword")}>ForgotPassword?</span></p>
                    </>
                )}
                {currState === "Sign Up" && (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                )}
                {currState === "ForgotPassword" && (
                    <p>Back to login? <span onClick={() => setCurrState("Login")}>Click here</span></p>
                )}
            </form>
        </div>
    );
    
};

export default LoginPopup;

// import './LoginPopup.css';

// import React, {
//   useContext,
//   useState,
// } from 'react';

// import { jwtDecode } from 'jwt-decode'; // ✅ Correct import
// import { useNavigate } from 'react-router-dom'; // ✅ Import navigation

// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../context/StoreContext';

// const LoginPopup = ({ setShowLogin, setUsername }) => {
//     const navigate = useNavigate(); // ✅ Initialize navigation
//     const [currState, setCurrState] = useState("Login");
//     const { setUserEmail } = useContext(StoreContext);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [contactNumber, setContactNumber] = useState("");
//     const [error, setError] = useState("");

//     // Function to handle login/signup request
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(""); // Clear previous errors

//         // Validate email format
//         if (!email.includes("@")) {
//             alert("Invalid email format!");
//             return;
//         }

//         let finalUsername = name;
//         if (currState === "Login") {
//             finalUsername = email.split("@")[0];
//         } else if (currState === "Sign Up" && name.trim() === "") {
//             alert("Please enter your name!");
//             return;
//         }

//         setUsername(finalUsername);
//         localStorage.setItem("username", finalUsername);
//         setUserEmail(email);
//         localStorage.setItem("userEmail", email);

//         const endpoint = currState === "Login" ? "/user/login" : "/user/signup";
//         const payload =
//             currState === "Login"
//                 ? { email, password }
//                 : { name, contactNumber, email, password };

//         try {
//             const response = await fetch(`http://localhost:8082${endpoint}`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(payload),
//             });

//             const data = await response.json();
//             console.log("Login response:", data); // ✅ Debugging

//             if (response.ok) {
//                 // ✅ Store JWT token
//                 localStorage.setItem("token", data.token);
//                 const decodedToken = jwtDecode(token);
//                 console.log("Decoded Token:", decodedToken);
//                 const userRole = decodedToken.role || "UNKNOWN";

//                 // ✅ Role-based navigation
//                 if (userRole === "admin") {
//                     localStorage.setItem("isAdmin", "true");
//                     alert("Admin login successful!");
//                     navigate("/adminDashboard");
//                 } else if (userRole === "user") {
//                     localStorage.setItem("isAdmin", "false");
//                     alert("User login successful!");
//                     navigate("/");
//                 } else {
//                     alert("Unknown role! Cannot redirect.");
//                 }

//                 setShowLogin(false); // ✅ Close popup on success
//             } else {
//                 setError(data.message || "Something went wrong");
//             }
//         } catch (err) {
//             setError("Failed to connect to the server");
//         }
//     };

//     return (
//         <div className="login-popup">
//             <form onSubmit={handleSubmit} className="login-popup-container">
//                 <div className="login-popup-title">
//                     <h2>{currState}</h2>
//                     <img
//                         onClick={() => setShowLogin(false)}
//                         src={assets.cross_icon}
//                         alt="Close"
//                     />
//                 </div>
//                 <div className="login-popup-inputs">
//                     {currState === "Sign Up" && (
//                         <>
//                             <input
//                                 type="text"
//                                 placeholder="Your name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Your no."
//                                 value={contactNumber}
//                                 onChange={(e) => setContactNumber(e.target.value)}
//                                 required
//                             />
//                         </>
//                     )}
//                     <input
//                         type="email"
//                         placeholder="Your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 {error && <p className="error-message">{error}</p>}
//                 <button type="submit">
//                     {currState === "Sign Up" ? "Create account" : "Login"}
//                 </button>
//                 <div className="login-popup-condition">
//                     <input type="checkbox" required />
//                     <p>By continuing, I agree to the terms of use & privacy policy.</p>
//                 </div>
//                 {currState === "Login" ? (
//                     <p>
//                         Create a new account?{" "}
//                         <span onClick={() => setCurrState("Sign Up")}>Click here</span>
//                     </p>
//                 ) : (
//                     <p>
//                         Already have an account?{" "}
//                         <span onClick={() => setCurrState("Login")}>Login here</span>
//                     </p>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default LoginPopup;

