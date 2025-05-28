import './Header.css';

import React from 'react';

import { motion } from 'framer-motion';

const Header = () => {
  return (
    <div className="header" id="header">
      <motion.div
        className="header-contents"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Order Your Favorite Food from Canteen
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Browse a wide selection of delicious dishes from your favorite shops in the Canteen.
          Easily place orders online and enjoy fast, reliable delivery straight to your doorstep.
          Satisfy your cravings with just a few clicks!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Header;
