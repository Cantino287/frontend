
import './FoodDisplay.css';

//   const handleTabClick = (name) => {
//     setCategory(name);
//   };
import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import { useStore } from '../../context/StoreContext';
// import {useStore}
import FoodItem from '../FoodItem/FoodItem';
import { FaSearch } from "react-icons/fa";

const FoodDisplay = () => {
  const [categories, setCategories] = useState({});
  const [category, setCategory] = useState("All");
  const [foodList, setFoodList] = useState([]);
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [shopName, setShopName] = useState("");
  //   const [selectedShopId, setSelectedShopId] = useState(localStorage.getItem("shopId") || "");
  const { shopId } = useStore();




  // ✅ Fetch categories
  useEffect(() => {
    const fetchCat = () => {

      fetch("https://cantino-backend.onrender.com/category/get", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then((data) => {
          const categoryMap = {};
          data.forEach((cat) => {
            categoryMap[cat.name] = cat.id;
          });
          setCategories(categoryMap);
        })
        .catch((error) => console.error("❌ Error fetching categories:", error));
    };
    fetchCat(); // Initial fetch
    const intervalId = setInterval(fetchCat, 1000); // Repeat every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  // ✅ Fetch food list by selected shop
  useEffect(() => {
    if (!shopId || shopId === "All" || shopId === "null") {
      console.warn("⛔ Invalid shopId, skipping fetch:", shopId);
      setFoodList([]);
      setFilteredFoodList([]);
      return;
    }

    const fetchMenu = () => {
      fetch(`https://cantino-backend.onrender.com/product/shop/${shopId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then((data) => {
          if (!Array.isArray(data.products)) {
            console.error("❌ 'products' field missing or not an array:", data);
            setFoodList([]);
            setFilteredFoodList([]);
            return;
          }

          console.log("✅ Fetched Products for Shop:", data.products);
          setFoodList(data.products);
          setFilteredFoodList(data.products);
        })
        .catch((error) => console.error("❌ Error fetching food by shop:", error));
    };

    fetchMenu();
    const intervalId = setInterval(fetchMenu, 5000); // every 5 seconds

    return () => clearInterval(intervalId);
  }, [shopId]);

  useEffect(() => {
    if (shopId) {
      axios
        .get(`https://cantino-backend.onrender.com/shop/shop-name/${shopId}`)
        .then((res) => setShopName(res.data))
        .catch((err) => console.error("Error fetching shop name:", err));
    }
  }, [shopId]);

  //   const selectedShop = shops.find(shop => shop.id === selectedShopId);
  //   const selectedShopName = selectedShop ? selectedShop.name : "";


  // ✅ Filter products by category
  useEffect(() => {
    let updatedList = [...foodList];

    if (category !== "All") {
      const categoryId = categories[category];
      updatedList = updatedList.filter((item) => item.categoryId === categoryId);
    }

    if (searchQuery.trim() !== "") {
      updatedList = updatedList.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFoodList(updatedList);
  }, [category, foodList, categories, searchQuery]);

  const handleTabClick = (tab) => {
    setCategory(tab);
  };

  // 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };



  return (
    <div className="food-display" id="food-display">
      {shopId ? (
        <section id="menu" className="menu">
          <div className="container" data-aos="fade-up">
            <div className="section-header text-center mb-4">
              <h2>Our Menu</h2>
              <p>
                Check <strong>{shopName || "Selected Shop"}</strong>'s <span>Menu</span>
              </p>
            </div>

            <ul
              className="nav nav-tabs justify-content-center gap-4"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {["All", ...Object.keys(categories)].map((cat) => (
                <li className="nav-item" key={cat}>
                  <button
                    className={`nav-link ${category === cat ? "active show" : ""}`}
                    onClick={() => handleTabClick(cat)}
                  >
  <h4 className="mb-0" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{cat}</h4></button>
                </li>
              ))}
            </ul>
            {/* ------------SEARCH BAR------------- */}

            <div className="search-wrapper">
              <div className="search-container">
                
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
            </div>

            {/* ----------------------------------- */}
            <div className="tab-content mt-4" data-aos="fade-up" data-aos-delay="300">
              <div className="tab-pane fade active show">
                <div className="food-display-list">
                  {filteredFoodList.length > 0 ? (
                    filteredFoodList.map((item) => (
                      <FoodItem key={item.id} product={item} />
                    ))
                  ) : (
                    <div className="no-food-wrapper">
                      <p>No {category.charAt(0).toUpperCase() + category.slice(1)} available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );


};

export default FoodDisplay;
