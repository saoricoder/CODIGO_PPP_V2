import React from 'react';


const Card = ({ title, icon, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="icon-container">
        {icon}
      </div>
      <div className="text-container">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
