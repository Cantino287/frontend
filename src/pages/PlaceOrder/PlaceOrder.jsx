// import './PlaceOrder.css';

// import React, {
//   useContext,
//   useState,
// } from 'react';

// import { useNavigate } from 'react-router-dom';
// import Select from 'react-select';

// import kpayImg from '../../assets/blue-L.png';
// import cashImg from '../../assets/cash.png';
// import { StoreContext } from '../../context/StoreContext';

// const PlaceOrder = () => {
//   const {
//     clearCart,
//     cartItems,
//     getDeliveryFee,
//     getNetTotal,
//     getTaxAmount
//   } = useContext(StoreContext);

//   const navigate = useNavigate();
//   const storedEmail = localStorage.getItem("userEmail") || "";
//   const shopId = localStorage.getItem("shopId");
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: storedEmail,
//     street: '',
//     phone: '',
//     paymentMethod: '',
//     totalAmount: getNetTotal(),
//     deliveryFee: getDeliveryFee(),
//     tax: getTaxAmount(),
//   });

//   const cartProducts = Object.values(cartItems || {});

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.paymentMethod) {
//       alert('Please select a payment method!');
//       return;
//     }

//     setLoading(true);

//     const token = localStorage.getItem('token');
    

//     const orderData = {
//       delivery: {
//         name: formData.name,
//         email: formData.email,
//         street: formData.street,
//         phone: formData.phone,
//         totalAmount: formData.totalAmount,
//         deliveryFee: formData.deliveryFee,
//         tax: formData.tax,
//         orderedProducts: cartProducts.map(item => ({
//           productId: item.id,
//           productName: item.name,
//           quantity: item.quantity
//         }))
//       },
//       paymentMethod: formData.paymentMethod,
//       shopId: shopId
//     };

//     try {
//       const response = await fetch('http://localhost:8082/delivery/placeOrder', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(orderData)
//       });

//       if (response.ok) {
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   setLoading(false); // Hide spinner first

//   // Let DOM update before blocking alert
//   setTimeout(() => {
//     alert('Order placed successfully! We will send invoice to your E-mail. (! Also check spam box )');
//     clearCart();
//     navigate('/');
//   }, 50); // Small delay (50ms)
// }
// else {
//         setLoading(false);
//         let errorMessage = 'Unknown error';
//         try {
//           const errorData = await response.json();
//           errorMessage = errorData.message || errorMessage;
//         } catch {
//           if (response.status === 403) {
//             errorMessage = 'Access denied. Please check your login or token.';
//           } else if (response.status === 500) {
//             errorMessage = 'Server error. Please try again later.';
//           } else {
//             errorMessage = `Error ${response.status}: ${response.statusText}`;
//           }
//         }
//         alert(`Failed to place order: ${errorMessage}`);
//       }
//     } catch (error) {
//       setLoading(false);
//       alert('Network error! Please try again.');
//     }
//   };
//   const paymentOptions = [
//     {
//       value: 'Cash',
//       label: (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <img src={cashImg} alt="Cash" style={{ width: 20, marginRight: 8 }} />
//           Cash
//         </div>
//       ),
//     },
//     {
//       value: 'KPay',
//       label: (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <img src={kpayImg} alt="KPay" style={{ width: 20, marginRight: 8 }} />
//           KBZ Pay (KPay)
//         </div>
//       ),
//     },
//   ];  

//   return (
//     <>
//       {loading && (
//         <div className="loading-overlay">
//           <div className="spinner" />
//           <p>Processing your order...</p>
//         </div>
//       )}

//       <form className='place-order' onSubmit={handleSubmit} style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? 'none' : 'auto' }}>
//         <div className="place-order-left">
//           <p className="title">Delivery Information</p>
//           <div className="multi-fields">
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email address"
//             value={formData.email}
//             readOnly
//           />
//           <input
//             type="text"
//             name="street"
//             placeholder="Street"
//             value={formData.street}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//           <div style={{ marginBottom: '1rem' }}>
//   <Select
//     options={paymentOptions}
//     placeholder="Select payment method"
//     onChange={(selectedOption) =>
//       setFormData({ ...formData, paymentMethod: selectedOption.value })
//     }
//     styles={{
//       option: (provided) => ({
//         ...provided,
//         display: 'flex',
//         alignItems: 'center',
//       }),
//       singleValue: (provided) => ({
//         ...provided,
//         display: 'flex',
//         alignItems: 'center',
//       }),
//     }}
//   />
// </div>

//         </div>

//         <div className="place-order-right">
//           <div className="cart-total">
//             <h2>Cart Totals</h2>
//             <div className="cart-total-details">
//               {cartProducts.map((item) => (
//                 <div key={item.id} className="cart-item-details">
//                   <span>{item.name}</span>
//                   <span>x {item.quantity}</span>
//                   <span>{item.price * item.quantity} Ks</span>
//                 </div>
//               ))}
//             </div>

//             <hr />
//             <div className="cart-item-details">
//               <p>Delivery Fee</p>
//               <p>{getDeliveryFee()} Ks</p>
//             </div>
//             <hr />
//             <div className="cart-item-details">
//               <p>Tax (5%)</p>
//               <p>{getTaxAmount()} Ks</p>
//             </div>
//             <hr />
//             <div className="cart-item-details">
//               <p>Net Total</p>
//               <p>{getNetTotal()} Ks</p>
//             </div>

//             <button type="submit" disabled={loading}>
//               PROCEED TO PAYMENT
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default PlaceOrder;




import './PlaceOrder.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import Select from 'react-select';
import cashImg from '../../assets/cash.png';
import kpayImg from '../../assets/blue-L.png';


const PlaceOrder = () => {
  const {
    clearCart,
    cartItems,
    getDeliveryFee,
    getNetTotal,
    getTaxAmount
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("userEmail") || "";
  const shopId = localStorage.getItem("shopId");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: storedEmail,
    street: '',
    phone: '',
    paymentMethod: '',
    totalAmount: getNetTotal(),
    deliveryFee: getDeliveryFee(),
    tax: getTaxAmount(),
  });

  const cartProducts = Object.values(cartItems || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.paymentMethod) {
      alert('Please select a payment method!');
      return;
    }

    setLoading(true);

    const token = localStorage.getItem('token');
    

    const orderData = {
      delivery: {
        name: formData.name,
        email: formData.email,
        street: formData.street,
        phone: formData.phone,
        totalAmount: formData.totalAmount,
        deliveryFee: formData.deliveryFee,
        tax: formData.tax,
        orderedProducts: cartProducts.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity
        }))
      },
      paymentMethod: formData.paymentMethod,
      shopId: shopId
    };

    try {
      const response = await fetch('https://cantino.onrender.com/delivery/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  setLoading(false); // Hide spinner first

  // Let DOM update before blocking alert
  setTimeout(() => {
    alert('Order placed successfully! We will send invoice to your E-mail. and check your E-mail ');
    clearCart();
    navigate('/');
  }, 50); // Small delay (50ms)
}
else {
        setLoading(false);
        let errorMessage = 'Unknown error';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          if (response.status === 403) {
            errorMessage = 'Access denied. Please check your login or token.';
          } else if (response.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          } else {
            errorMessage = `Error ${response.status}: ${response.statusText}`;
          }
        }
        alert(`Failed to place order: ${errorMessage}`);
      }
    } catch (error) {
      setLoading(false);
      alert('Network error! Please try again.');
    }
  };
  const paymentOptions = [
    {
      value: 'Cash',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={cashImg} alt="Cash" style={{ width: 20, marginRight: 8 }} />
          Cash
        </div>
      ),
    },
    {
      value: 'KPay',
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={kpayImg} alt="KPay" style={{ width: 20, marginRight: 8 }} />
          KBZ Pay (KPay)
        </div>
      ),
    },
  ];  

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>Processing your order...</p>
        </div>
      )}

      <form className='place-order' onSubmit={handleSubmit} style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? 'none' : 'auto' }}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            readOnly
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <div style={{ marginBottom: '1rem' }}>
  <Select
    options={paymentOptions}
    placeholder="Select payment method"
    onChange={(selectedOption) =>
      setFormData({ ...formData, paymentMethod: selectedOption.value })
    }
    styles={{
      option: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
      }),
      singleValue: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
      }),
    }}
  />
</div>

        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              {cartProducts.map((item) => (
                <div key={item.id} className="cart-item-details border-b-2">
                  <span>{item.name}</span>
                  <span>x {item.quantity}</span>
                  <span>{item.price * item.quantity} Ks</span>
                </div>
              ))}
            </div>
            {/* <hr style={{ border: '0.5px solid #ccc', margin: '15px 0' }} /> */}
            
            <div className="cart-item-details border-b-2">
              <p>Delivery Fee</p>
              <p>{getDeliveryFee()} Ks</p>
            </div>
              {/* <hr style={{ border: '0.5px solid #ccc', margin: '15px 0' }} /> */}
            <div className="cart-item-details border-b-2">
              <p>Tax (5%)</p>
              <p>{getTaxAmount()} Ks</p>
            </div>
{/* <hr style={{ border: '0.5px solid #ccc', margin: '15px 0' }} />    */}
         <div className="cart-item-details border-b-2">
              <p>Net Total</p>
              <p>{getNetTotal()} Ks</p>
            </div>

            <button type="submit" disabled={loading}>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;



