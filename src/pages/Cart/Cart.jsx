import './Cart.css';
import '../PlaceOrder/PlaceOrder.css'

import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
    const { cartItems, removeFromCart, getTotalCartAmount, getDeliveryFee, getNetTotal, getTaxAmount} = useContext(StoreContext);
    const navigate = useNavigate();
    const [shopName, setShopName] = useState("");
    // const [shopPhone, setShopPhone] = useState(''); 
    const {setShop, setShopPhone } = useContext(StoreContext);
    useEffect(() => {
        const shopId = localStorage.getItem("shopId");
        if (shopId) {
          fetch(`http://localhost:8082/shop/shop-name/${shopId}`)
            .then((res) => {
              if (!res.ok) throw new Error("Failed to fetch shop name");
              return res.text();
            })
            .then((name) => setShopName(name))
            .catch((err) => console.error("Error fetching shop name:", err));
        }
      }, []);

    //   useEffect(() => {
    //     const shopId = localStorage.getItem('shopId'); // get shopId from localStorage
    
    //     const fetchShop = async () => {
    //       try {
    //         const response = await axios.get(`http://localhost:8082/shop/get/${shopId}`);
    //         setShop(response.data);
    //         setShopPhone(response.data.phone);         // set shopPhone after fetching shop
    //       } catch (error) {
    //         console.error('Error fetching shop:', error);
    //       }
    //     };
    
    //     if (shopId) {
    //       fetchShop();
    //     }
    //     // navigate('../myorders', {
    //     //     state: {
    //     //         shopPhone: shopPhone,
    //     //     },
    //     // });
        
        
    //   }, []); // run once on mount
    useEffect(() => {
        const shopId = localStorage.getItem('shopId'); // get shopId from localStorage
        const fetchShop = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/shop/get/${shopId}`);
                setShop(response.data);
                setShopPhone(response.data.phone);
                console.log('Set shopPhone:', response.data.phone);
                  // ✅ sets globally
            } catch (error) {
                console.error('Error fetching shop:', error);
            }
        };

        if (shopId) {
            fetchShop();
        }
    }, [setShop, setShopPhone]);
      
      

    // Ensure cartItems is an array before mapping
    const cartProducts = Object.values(cartItems || {});

    return (
        <div className="cart">
            {/* <div className="cart-items">
                <div className="cart-items-title cart-items-item">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {cartProducts.length > 0 ? (
                    cartProducts.map((item) => (
                        <div key={item.id}>
                            <div className='cart-items-title cart-items-item'>
                                <img src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                                <p>${item.price.toFixed(2)}</p>
                                <p>{item.quantity}</p>
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                                <p onClick={() => removeFromCart(item.id)} className='cross'>x</p>
                            </div>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p className="empty-cart-message">Your cart is empty.</p> // ✅ Show message if cart is empty
                )}
            </div> */}

<div className="cart-container">
{/* {shopName && (
        <div className="shop-info">
          <h3>Order from: <span style={{ color: 'black'}}>{shopName}</span></h3>
        </div>
      )} */}
    <table className="cart-table">
        <thead>
            <tr>
                <th>From</th>
                <th>Item</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
            {cartProducts.length > 0 ? (
                cartProducts.map((item) => (
                    <tr key={item.id}>
                        {shopName && (
                        <td>{shopName}</td>
                        )}
<td>
  <img
    src={`http://localhost:8082/images/product-images/${item.image}`}
    alt={item.name}
    className="cart-item-image"
  />
</td>

                        <td>{item.name}</td>
                        <td>{item.price} Ks</td>
                        <td>{item.quantity}</td>
                        <td>{(item.price * item.quantity)} Ks</td>
                        
                        
                        <td>
                            <span onClick={() => removeFromCart(item.id)} className="remove-item">x</span>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="7" className="empty-cart-message">Your cart is empty.</td>
                </tr>
            )}
        </tbody>
    </table>
</div>


            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-item-details">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()} Ks</p>
                        </div>
                        <hr style={{ border: '0.5px solid #ccc', margin: '15px 0' }} />
                        <div className="cart-item-details">
                            <p>Delivery Fee</p>
                            <p>{getDeliveryFee()} Ks</p>
                        </div>
                        <hr style={{ border: '0.5px solid #ccc', margin: '15px 0' }} />
                        <div className="cart-item-details">
                            <p>Tax (5%)</p>
                            <p>{getTaxAmount()} Ks</p>
                        </div>
                        <hr style={{ border: '0.5px solid #ccc', margin: '15px 0' }} />
                        <div className="cart-item-details">
  <p>Net Total</p>
  <p>{getNetTotal()} Ks</p>
</div>
<hr style={{ border: '0.5px solid #ccc', margin: '15px 0' }} />

                    </div>
                    <button onClick={() => navigate('/order')} disabled={cartProducts.length === 0}>
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;

