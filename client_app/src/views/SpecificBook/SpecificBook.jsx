import React, { useState, useEffect } from 'react';
import CardSpecific from '../../components/SpecificBook/CardSpecific';
import Descripcion from '../../components/SpecificBook/Descripcion';
import Generos from '../../components/SpecificBook/Generos';
import Informacion from '../../components/SpecificBook/Informacion';
import ButtonAdd from '../../components/SpecificBook/ButtonAdd';

export default function SpecificBook() {
  const generos = ['Fantasía', 'Aventura', 'Drama'];
  const titulo = 'Dracula';
  const libro = {
    id: 1,
    title: titulo,
  };

  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (book) => {
    if (!books.find((b) => b.id === book.id)) {
      setBooks([...books, book]);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row specific-book-grid">
        {/* Primera columna */}
        <div className="col-md-4">
          <div className="card bg-transparent border-0 p-1">
            <CardSpecific subtitle={'Autor: '} />
          </div>
        </div>

        {/* Segunda columna */}
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0">
                <p>
                  <strong>Título:</strong> {titulo}
                </p>
              </div>
            </div>

            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0">
                <Descripcion texto={'La novela comienza con Jonathan Harker, un joven abogado londinense comprometido con Wilhemina Murray (Mina), el cual se encuentra en la ciudad de Bistritz como parte de un viaje de negocios, que continuará a través del desfiladero del Borgo hasta el remoto castillo de su cliente, el conde Drácula, en una de las regiones más lejanas de la Rumania de la época, los montes Cárpatos de Transilvania, para cerrar unas ventas con él. En una posada, los aldeanos locales le advierten que, al ser la víspera del Día de San Jorge, las fuerzas del mal tienen completo poder. Tras instarle sin éxito a quedarse, la dueña de la posada le regala a Jonathan un rosario con esperanzas de protegerlo de las influencias malignas. Convirtiéndose durante un breve período de tiempo en huésped del conde, el joven inglés va descubriendo que la personalidad de Drácula es extraña comparada a sus costumbres inglesas: no se refleja en los espejos, no come nunca en su presencia, y hace vida nocturna.'} />
              </div>
            </div>

            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0">
                <Generos generos={generos} />
              </div>
            </div>

            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0 p-1">
                <Informacion
                  No_paginas={223}
                  editorial={'Book'}
                  idiomas={'Español'}
                  fecha_publicacion={2000}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="card bg-transparent border-0 p-2">
                <ButtonAdd book={libro} onAdd={handleAddBook} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}