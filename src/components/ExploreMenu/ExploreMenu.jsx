import './ExploreMenu.css';

import React, {
  useEffect,
  useState,
} from 'react';

import { toast } from 'react-toastify';

import { useStore } from '../../context/StoreContext';

const ExploreMenu = () => {
    const [shops, setShops] = useState([]);
    const [error, setError] = useState(null);
    const { shopId, setShopId, cartItems } = useStore(); // Using your context/store
  
    useEffect(() => {
      const fetchShops = () => {
        fetch("https://cantino-backend.onrender.com/shop/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch shops");
            return response.json();
          })
          .then((data) => setShops(data))
          .catch((error) => {
            console.error("Error fetching shops:", error);
            setError("Failed to load shop list. Please try again later.");
          });
      };
  
      fetchShops();
      const intervalId = setInterval(fetchShops, 5000);
      return () => clearInterval(intervalId);
    }, []);
  
    const handleShopSelect = (newShopId) => {
      const token = localStorage.getItem('token'); // Check if user is logged in

  if (!token) {
    const audio = new Audio('/error.mp3');
    audio.play();
    toast.error("⚠️ Please log in or sign up before selecting a shop.", {
      autoClose: false,
      closeOnClick: true,
      position: "bottom-center",
      className: "bg-red-600 text-white",
    });
    return;
  }
      if (Object.keys(cartItems).length > 0 && newShopId !== shopId) {
        const audio = new Audio('/error.mp3'); // 👉 Make sure you have this file in your public folder
        audio.play();
        toast.error("⚠️ Cannot change shop while cart has items. Please clear the cart first.", {
          autoClose: false,
          closeOnClick: true,
          position: "bottom-center", // or 'bottom-right'
          className: "bg-red-600 text-white", // 🔴 Red background, white text
        });
    
        return;
      }
  
      setShopId(newShopId);
      localStorage.setItem("shopId", newShopId);
    };
  
    return (
      <div className="explore-menu" id="explore-menu">
      <div className="food-display" id="food-display">
  <h2>Popular Canteen Shops</h2>
</div>

<h1>Explore Our Canteen</h1>
<p className="explore-menu-text">
  Discover a variety of food shops inside the canteen offering tasty meals, snacks, and beverages. Whether you're craving something quick or looking for a hearty meal, there's something here for everyone!
</p>


  
        {error && <p className="error-message">{error}</p>}
  
        <div className="explore-menu-list" style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: "20px",
          padding: "16px 0",
        }}>
          {shops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => handleShopSelect(shop.id)}
              className="explore-menu-list-item text-center"
              style={{
                cursor: "pointer",
                minWidth: "160px",
                flex: "0 0 auto",
              }}
            >
              <img
                className={shopId === shop.id ? "active" : ""}
                src={`https://cantino-backend.onrender.com/images/shop-images/${shop.image}`}
                onError={(e) => {
                  e.target.src = "/fallback-image.jpg";
                }}
                alt={shop.name}
                style={{
                  width: "140px",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "70px",
                  border: shopId === shop.id ? "3px solid tomato" : "2px solid transparent",
                  transition: "border 0.3s",
                  alignItems: "center",
                  marginLeft: "10px"
                }}
              />
              <p style={{ marginTop: "8px", alignItems: "center" ,fontWeight: shopId === shop.id ? "bold" : "normal" }}>
                {shop.name}
              </p>
            </div>
          ))}
        </div>
  
        <hr />
        {/* {shopId && <FoodDisplay />} */}
      </div>
    );
  };
  
  

export default ExploreMenu;

