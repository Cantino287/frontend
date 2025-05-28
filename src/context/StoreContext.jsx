import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

export const StoreContext = createContext(null);

export const StoreProvider = (props) => {
    const [shopId, setShopId] = useState(() => {
        const stored = localStorage.getItem("shopId");
        return stored && stored !== "null" ? parseInt(stored) : null;
      });
      
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("cartItems");
        return storedCart ? JSON.parse(storedCart) : {};
      });
      const [shop, setShop] = useState(null);
      
    const [foodList, setFoodList] = useState([]);
    const [filteredFoodList, setFilteredFoodList] = useState([]);
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");

    const [shopPhone, setShopPhone] = useState('');
    
    
    useEffect(() => {
        if (!shopId) return;
    
        fetch(`http://localhost:8082/product/shop/${shopId}`, {
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
            console.log("✅ Fetched Products for Shop:", data);
            setFoodList(data);
            setFilteredFoodList(data);
          })
          .catch((error) => console.error("❌ Error fetching food by shop:", error));
      }, [shopId]);

      useEffect(() => {
        const shopId = localStorage.getItem("shopId");
        if (shopId) {
          fetch(`http://localhost:8082/shop/shop-name/${shopId}`)
            .then((res) => res.json())
            .then((data) => setShopName(data))
            .catch((err) => console.error("❌ Error fetching shop name:", err));
        }
      }, []);
    
    useEffect(() => {
        if (userEmail) {
            localStorage.setItem("userEmail", userEmail);
            console.log("✅ Stored userEmail in localStorage:", userEmail);
        }
    }, [userEmail]);

//     useEffect(() => {
//         const storedShopId = localStorage.getItem("shopId");
// if (storedShopId && storedShopId !== "null") {
//   setShopId(parseInt(storedShopId));
// }
// else {
//           console.error("❌ shopId not found in localStorage.");
//         }
//       }, []);

      useEffect(() => {
        if (shopId !== null && shopId !== undefined) {
          localStorage.setItem("shopId", shopId.toString());
        } else {
          localStorage.removeItem("shopId");
        }
      }, [shopId]);
      
      
    
    

    // ✅ Save cart to localStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);
    
  
    
      const addToCart = (product) => {
        // const productShopId = product.shopId?.toString();
        const productShopId = parseInt(product.shopId);
    
        if (!productShopId) {
          console.error("❌ Product missing shopId:", product);
          return;
        }
        console.log("💬 shopId:", shopId, "product.shopId:", product.shopId, "parsed:", productShopId);

    
        if (shopId && shopId !== productShopId) {
          toast.error("⚠️ You cannot add items from a different shop. Clear your cart first.");
          return;
        }
    
        if (!shopId) {
          setShopId(productShopId);
          localStorage.setItem("shopId", productShopId);
        }
    
        setCartItems((prev) => {
          const updatedCart = { ...prev };
          if (updatedCart[product.id]) {
            updatedCart[product.id].quantity += 1;
          } else {
            updatedCart[product.id] = { ...product, quantity: 1 };
          }
          return updatedCart;
        });
      };
    
      const removeFromCart = (productId) => {
        setCartItems((prev) => {
          const updatedCart = { ...prev };
          if (updatedCart[productId]) {
            updatedCart[productId].quantity -= 1;
            if (updatedCart[productId].quantity <= 0) {
              delete updatedCart[productId];
            }
          }
      
          const isEmpty = Object.keys(updatedCart).length === 0;
      
          if (Object.keys(updatedCart).length === 0) {
            setShopId(null); // ⬅ clear shopId
          }
              toast.success("Item removed"); // Show success message
          
      
          return updatedCart;
        });
      };
      
    // Calculate total cart amount
    const getTotalCartAmount = () => {
        return Object.values(cartItems).reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };
    const getDeliveryFee = () => {
        return getTotalCartAmount() === 0 ? 0 : 200;
      };

      const getTaxAmount = () => {
        const subtotal = getTotalCartAmount();
        const deliveryFee = getDeliveryFee();
        const totalBeforeTax = subtotal + deliveryFee;
        const tax = totalBeforeTax * 0.05; // 5% tax
        return Math.round(tax); // Round to nearest Ks
      };
      const getNetTotal = () => {
        const subtotal = getTotalCartAmount();
        const deliveryFee = getDeliveryFee();
        const tax = getTaxAmount();
        return subtotal + deliveryFee + tax;
      };
      
      
      

    // Clear the cart after order is placed
    const clearCart = () => {
        setCartItems({});
        setShopId(null); // ⬅ also here
      };
      

    
    const refreshFoodList = () => {
        if (!shopId || shopId === "All") {
          setFoodList([]);
          setFilteredFoodList([]);
          return;
        }
      
        fetch(`http://localhost:8082/product/shop/${shopId}`, {
          method: "GET",
          credentials: "include", // ✅ includes cookies/session
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("🔄 Product List Updated:", data);
            setFoodList(data.products); // Assuming 'products' is the array of products
            setFilteredFoodList(data.products); // Update filtered food list as well
          })
          .catch((error) => console.error("❌ Error refreshing food list:", error));
      };
      
      useEffect(() => {
        // Fetch food list initially
        refreshFoodList();
        
        // Set an interval to refresh the food list every 5 seconds
        const intervalId = setInterval(refreshFoodList, 5000);
      
        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, [shopId]); // Re-run effect when selectedShopId changes
      
    
    

    const contextValue = {
        userEmail,
        setUserEmail, // Add to context
        foodList,
        cartItems,
        shop,
        setShop, 
        setCartItems,
        shopPhone,
        setShopPhone,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getDeliveryFee,
        getTaxAmount,
        getNetTotal,
        clearCart, // ✅ Added clearCart function
        refreshFoodList,
        shopId,
        setShopId
    };

    return (
        <StoreContext.Provider value={contextValue}>
          {props.children}
        </StoreContext.Provider>
      );
    };
    
    // 3. Create a custom hook for easy access
    export const useStore = () => useContext(StoreContext);