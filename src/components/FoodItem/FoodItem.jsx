// import './FoodItem.css';

// import React, { useContext } from 'react';

// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../context/StoreContext';

// const FoodItem = ({id,name,price,description,image}) => {
  
//     const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);

//     return (
//     <div className='food-item'>
//         <div className="food-item-img-container">
//             <img className='food-item-image' src={image} alt="" />
//             {!cartItems[id]
//                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/>
//                : <div className="food-item-counter">
//                 <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
//                 <p>{cartItems[id]}</p>
//                 <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
//                </div>
//             }
//         </div>
//         <div className="food-item-info">
//             <div className="food-item-name-rating">
//                 <p>{name}</p>
//                 <img src={assets.rating_starts} alt="" />
//             </div>
//             <p className="food-item-desc">{description}</p>
//             <p className="food-item-price">${price}</p>
//         </div>
//     </div>
//   )
// }

// export default FoodItem

import './FoodItem.css'; // if you have styling

import React from 'react';

import { assets } from '../../assets/assets';
import { useStore } from '../../context/StoreContext';
import { toast } from 'react-toastify';


const FoodItem = ({ product }) => {
  const { id, name, description, price, image, status } = product;
  const { cartItems, addToCart, removeFromCart } = useStore();

  const handleAdd = () => {
    addToCart(product);
    toast.success("Item added"); // Show success message
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    // toast.success("Item removed"); // Show success message

  };
  const imageUrl = image
    ? `https://cantino.onrender.com/images/product-images/${image}`
    : "/default-image.jpg";

  const isAvailable = status === 'Available';
  return (
    <div className="food-item">
      {/* <div className="food-item-img-container">
        {!isAvailable && <div className="unavailable-overlay">Unavailable</div>}
        <img className="food-item-image" src={imageUrl} alt={name} />

        {isAvailable && (!cartItems[id] ? (
          <img
            className="add"
            onClick={handleAdd} // ✅ Pass full product
            // src={assets.ad
            // alt="Add to cart"
            src='src/assets/add_icon_1.png'
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={handleRemove}
              src={assets.remove_icon_red}
              alt="Remove from cart"
            />
            <p>{cartItems[id].quantity}</p>
            <img
              onClick={handleAdd} // ✅ Pass full product
              src={assets.add_icon_green}
              alt="Add more"
            />
          </div>
        ))}
      </div> */}
      <div className="food-item-img-container">
  {!isAvailable && <div className="unavailable-overlay">Unavailable</div>}
  
  <img className="food-item-image" src={imageUrl} alt={name} />

  {isAvailable && (!cartItems[id] ? (
    <img
      className="add"
      onClick={handleAdd}
      src="src/assets/add_icon_1.png"
      alt="Add to cart"
    />
  ) : (
    <div className="food-item-counter">
      <img
        onClick={handleRemove}
        src={assets.remove_icon_red}
        alt="Remove from cart"
      />
      <p>{cartItems[id].quantity}</p>
      <img
        onClick={handleAdd}
        src={assets.add_icon_green}
        alt="Add more"
      />
    </div>
  ))}
</div>


      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {/* <img src={assets.rating_stars} alt="Rating" /> */}
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{price} Ks</p>
      </div>
    </div>
  );
};

export default FoodItem;

