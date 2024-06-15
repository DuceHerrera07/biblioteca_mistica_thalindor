import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, subtitle, link, ...more}) => {
  const navigate = useNavigate();
  return (
    <div className="card shadow-sm" style={{ borderRadius: '5px', overflow: 'hidden' }}>
      <div className="d-flex justify-content-center">
        <img
          src="https://via.placeholder.com/200"
          className="card-img-top"
          alt="Placeholder"
          style={{
            height: '200px',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>
      <div className="card-body" style={{ padding: '15px' }}>
        <h5 className="card-title" style={{
          fontSize: '1rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>{title}</h5>
        <p className="card-subtitle mb-2 text-muted" style={{
          fontSize: '0.85rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>{subtitle}</p>
        {more.rating && (
          <p className="card-text" style={{
            fontSize: '0.85rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            <small>{more.rating.text}: {more.rating.count}</small>
          </p>
        )}
        <div className="d-flex justify-content-end">
          <a 
            onClick={()=>{
              if (more.onClickSelectedCategory) {
                more.onClickSelectedCategory();
                navigate(link.href);
              }
              navigate(link.href);
            }}
            className="btn btn-primary btn-sm"
            style={{
              fontSize: '0.85rem',
              padding: '5px 10px',
              borderRadius: '20px'
            }}
          >{link.text}</a>
        </div>
      </div>
    </div>
  );
};

export default Card;
