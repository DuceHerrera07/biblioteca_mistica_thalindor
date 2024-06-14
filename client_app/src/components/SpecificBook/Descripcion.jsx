import React from 'react';

const Descripcion = ({ texto }) => {
  const limiteCaracteres = 455; // Límite máximo de caracteres para la descripción

  // Función para truncar el texto si excede el límite de caracteres
  const truncarTexto = (text) => {
    if (text.length <= limiteCaracteres) {
      return text;
    }
    return text.slice(0, limiteCaracteres) + '...'; // Agregar puntos suspensivos al final del texto truncado
  };

  return (
    <div className="col-md-12">
      <p><strong>Descripción:</strong></p>
      <div className="card bg-transparent border-0">
        <p className="text-justify">
          {truncarTexto(texto)}
        </p>
      </div>
    </div>
  );
};

export default Descripcion;
