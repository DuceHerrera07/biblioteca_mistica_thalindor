import React from 'react';
import Delete from '../../Icon/ButtonDelete/Delete';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function ButtonDelete({ onDelete }) {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>Eliminar</Tooltip>}
    >
      <button type="button" className="btn btn-outline-dark btn-sm" onClick={onDelete} style={{ border: 'none' }}>
        <Delete />
      </button>
    </OverlayTrigger>
  );
}