import React from 'react'
import './Model.css'
const Model = ({children, isOpen, onClose}) => {
    if (!isOpen) return;
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  )
}

export default Model
