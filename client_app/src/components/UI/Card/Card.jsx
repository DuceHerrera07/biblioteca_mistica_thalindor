import React from 'react';

const Card = ({ title, subtitle, link }) => {
  return (
    <div className="card ">
      <img src="https://via.placeholder.com/250" className="card-img-top p-1" alt="Placeholder" style={{ width: 'auto', height: 'auto' }}/>
      <div className="card-body p-2" style={{ width: '198px', height: '131px' }}>
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle text-muted">{subtitle}</h6>
        <a href={link.href} className="card-link position-absolute bottom-0 end-10">{link.text}</a>
      </div>
    </div>
  );
};

export default Card;