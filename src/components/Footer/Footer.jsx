import './Footer.css';

import React, {
  useEffect,
  useState,
} from 'react';

import Lottie from 'lottie-react';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { assets } from '../../assets/assets';
import facebookAnimation from '../../assets/Facebook.json';
import gmailAnimation from '../../assets/gmail.json';
import telegramAnimation from '../../assets/telegram-2.json'; // Adjust the path
import TruckAnimation from './TruckAnimation'; // Adjust path

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState("");
    window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleHomeClick = () => {
    navigate('/', { state: { scrollToTop: true } });
  };
  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
 
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img className='position' src={assets.logo} style={{width:200, height:60}} alt="" />
            <p>
  Our canteen platform makes it easy to explore shops, order your favorite meals, and enjoy quick delivery — all in one place. Simple, fast, and delicious every time.
</p>
            <div className="footer-social-icons">
            <a href="mailto:kokolay1969@gmail.com" target="_blank" rel="noopener noreferrer">
  <Lottie 
    animationData={gmailAnimation} 
    loop={true} 
    style={{ height: 50, width: 50 }} 
  />
</a>

<a
  href="https://www.facebook.com/yourpage"  // ← Replace with your real page/profile URL
  target="_blank"
  rel="noopener noreferrer"
>
  <Lottie 
    animationData={facebookAnimation} 
    loop={true} 
    style={{ height: 44, width: 44 }} 
  />
</a>

                <a
  href="https://t.me/+VPxT93kCr7tmNjY1"
  target="_blank"
  rel="noopener noreferrer"
>
  <Lottie 
    animationData={telegramAnimation} 
    loop={true} 
    style={{ height: 50, width: 50 }} 
  />
</a>


            </div>
        </div>
        <div className="footer-content-center">
            <h2>Tabs</h2>
            <ul>
            <li onClick={handleHomeClick} style={{ cursor: 'pointer' }}>Home</li>
                <li> <Link
                to="/myorders"
                onClick={() => setMenu("myorders")}
                className={menu === "myorders" ? "active" : ""}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                My Orders
              </Link></li>
                
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>09-689416822</li>
                {/* <li>contact@tomato.com</li> */}
            </ul>
        </div>
      </div>
      <TruckAnimation />
    <p className="footer-copyright">Copyright 2025 &copy; CANTINO - All Right Reserved.</p>
    </div>
  )
}


export default Footer
