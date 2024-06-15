import React from 'react';

export default function Generos({ generos }) {
  return (
    <div>
      <p><strong>Géneros:</strong></p>
      <ul className="list-inline">
        {generos.map((genero, index) => (
          <li key={index} className="list-inline-item">{genero}</li>
        ))}
      </ul>
    </div>
  );
}