import React from 'react';
import './Popup.scss';

const Popup = ({ isOpen, onClose, children }) => {
  const overlayStyle = {
    display: isOpen ? 'block' : 'none',
  };

  return (
    <div className="popup-overlay" style={overlayStyle} onClick={onClose}>
      <div className="popup-con" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
