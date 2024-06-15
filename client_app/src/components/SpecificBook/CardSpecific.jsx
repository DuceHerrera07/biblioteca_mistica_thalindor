import React from 'react';

import ISBN from './ISBN';

export default function CardSpecific({id, subtitle }) {
  return (
    <div className="card mb-3 custom-card" data-id={id}>
      <div className="card-body">
        <h6 className="card-subtitle text-muted">{subtitle}</h6>
      </div>
      <div className="icon-container">
        <ISBN/>
      </div>
    </div>
  );
}