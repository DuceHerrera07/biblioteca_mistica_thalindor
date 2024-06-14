import React from 'react';
import ToggleEye from '../UI/Button/ToggleEye/ToggleEye';

export default function Informacion({ No_paginas, editorial, idiomas, fecha_publicacion }) {
  return (
    <div className='card border-0 rounded p-1 bg-transparent'>
      <div className='row'>
        <div className='col-md-6 d-flex align-items-center'>
          <p className='mb-0 me-2 fs-6'><strong>Número de páginas:</strong> {No_paginas}</p>
          <p className='mb-0 me-2 fs-6'><strong>Editorial:</strong> {editorial}</p>
        </div>
        <div className='col-md-6 d-flex align-items-center'>
          <p className='mb-0 me-2 fs-6'><strong>Idiomas:</strong> {idiomas}</p>
          <p className='mb-0 me-2 fs-6'><strong>Fecha de publicación:</strong> {fecha_publicacion}</p>
          <div className='mb-0'><ToggleEye /></div>
        </div>
      </div>
    </div>
  );
}