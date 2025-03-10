import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import '../styles/Letter.css';

const Letter = ({ children, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    onOpen?.();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`letter-wrapper ${isOpen ? 'open' : ''}`}>
      <div className="envelope">
        {!isOpen && (
          <motion.div 
            className="envelope-front"
            whileHover={{ scale: 1.02 }}
          >
            <div className="envelope-flap" />
            <motion.button
              className="envelope-trigger"
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Open Letter 💌
            </motion.button>
          </motion.div>
        )}
        
        <motion.div 
          className="letter-content"
          initial={false}
          animate={isOpen ? {
            y: -20,
            scale: 1,
            opacity: 1
          } : {
            y: 0,
            scale: 0.95,
            opacity: 0
          }}
          transition={{ duration: 0.5 }}
        >
          {children}
          <Button 
            onClick={handleClose}
            className="button button-close"
          >
            Close Letter 💌
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Letter;