// // import React, { useEffect } from 'react';

// // import { Html5QrcodeScanner } from 'html5-qrcode';

// // const QRScanner = ({ onScan }) => {
// //     useEffect(() => {
// //         const scanner = new Html5QrcodeScanner(
// //             "reader",
// //             { fps: 10, qrbox: 250 },
// //             false
// //         );

// //         scanner.render(
// //             (decodedText) => {
// //                 console.log("QR Code scanned: ", decodedText);
// //                 onScan(decodedText); // Pass the scanned QR data
// //                 scanner.clear();
// //             },
// //             (errorMessage) => {
// //                 console.log("QR Scan error: ", errorMessage);
// //             }
// //         );

// //         return () => scanner.clear();
// //     }, [onScan]);

// //     return <div id="reader"></div>;
// // };

// // export default QRScanner;

// import { useState } from 'react';

// import QrReader from 'react-qr-reader';
// import { useNavigate } from 'react-router-dom';

// const QRScanner = () => {
//     const [scanResult, setScanResult] = useState(null);
//     const navigate = useNavigate(); // React Router navigation

//     const handleScan = (data) => {
//         if (data) {
//             console.log("QR Code scanned: ", data);
//             setScanResult(data);

//             // Extract tableNumber, seat, and password from URL
//             const urlParams = new URLSearchParams(new URL(data).search);
//             const tableNumber = urlParams.get("tableNumber");
//             const seat = urlParams.get("seat");
//             const password = urlParams.get("password");

//             if (tableNumber && seat && password) {
//                 // Perform login request
//                 fetch(`http://localhost:8082/table-login/auto-login?tableNumber=${tableNumber}`)
//                     .then(response => response.json())
//                     .then(data => {
//                         console.log("Auto-login successful:", data);
//                         // Redirect to the home page after successful login
//                         navigate("/home");
//                     })
//                     .catch(error => console.error("Login error:", error));
//             } else {
//                 console.error("Invalid QR Code format");
//             }
//         }
//     };

//     const handleError = (err) => {
//         console.error("QR Scan error: ", err);
//     };

//     return (
//         <div>
//             <h2>Scan QR Code</h2>
//             <QrReader
//                 delay={300}
//                 onError={handleError}
//                 onScan={handleScan}
//                 style={{ width: "100%" }}
//             />
//             {scanResult && <p>Scanned Data: {scanResult}</p>}
//         </div>
//     );
// };

// export default QRScanner;

import {
  useEffect,
  useState,
} from 'react';

import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const navigate = useNavigate(); // React Router navigation

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("qr-reader", {
            fps: 10,
            qrbox: { width: 250, height: 250 },
        });

        scanner.render(
            (decodedText) => {
                console.log("QR Code scanned:", decodedText);
                setScanResult(decodedText);
                scanner.clear(); // Stop scanning after a successful scan

                // Extract table login data from the scanned URL
                const urlParams = new URLSearchParams(new URL(decodedText).search);
                const tableNumber = urlParams.get("tableNumber");
                const seat = urlParams.get("seat");
                const password = urlParams.get("password");

                if (tableNumber && seat && password) {
                    // Call backend for auto-login
                    // fetch(`http://localhost:8082/table-login/auto-login?tableNumber=${tableNumber}`)
                    fetch(`http://localhost:8082/table-login/auto-login?tableNumber=${tableNumber}&seat=${seat}&password=${password}`)

                        .then(response => response.json())
                        .then(data => {
                            console.log("Auto-login successful:", data);
                            navigate("/"); // Navigate to home page after login
                        })
                        .catch(error => console.error("Login error:", error));
                } else {
                    console.error("Invalid QR Code format");
                }
            },
            (error) => {
                console.error("QR Scan error:", error);
            }
        );

        return () => scanner.clear();
    }, [navigate]);

    return (
        <div>
            <h2>Scan QR Code</h2>
            <div id="qr-reader" style={{ width: "100%" }}></div>
            {scanResult && <p>Scanned Data: {scanResult}</p>}
        </div>
    );
};

export default QRScanner;
