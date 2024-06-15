import React from 'react';

const Card = ({ title, subtitle, link }) => {
  return (
    <div className="card">
      <img src="https://via.placeholder.com/250" className="card-img-top p-1" alt="Placeholder" style={{height: '183px'}}/>
      <div className="card-body p-2" style={{ maxWidth: '198px', maxHeight: '131px', overflow: 'hidden' }}>
        <p className="card-title  mb-1" style={{fontSize: '0.80rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</p>
        <p className="card-subtitle text-muted mb-3" style={{ fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subtitle}</p>
        <a href={link.href} className="card-link position-absolute bottom-0 end-10 mb-0" style={{ fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.text}</a>
      </div>
    </div>
  );
};

export default Card;