import React, { useState, useEffect } from 'react';
import CardSpecific from '../../components/SpecificBook/CardSpecific';
import Descripcion from '../../components/SpecificBook/Descripcion';
import Generos from '../../components/SpecificBook/Generos';
import Informacion from '../../components/SpecificBook/Informacion';
import ButtonAdd from '../../components/SpecificBook/ButtonAdd';
import { useParams } from 'react-router-dom';
import api from '../../api';
import SpinnerComponent from '../../components/Spinner/SpinnerComponent';


export default function SpecificBook() {
  const { idlibro } = useParams();
  const [currentBook, setCurrentBook] = useState({});
  const [loading, setLoading] = useState(true);

  console.log('parametro', idlibro);

  useEffect(() => {
    api.get(`api/library/books/${idlibro}`).then((response) => {
      setCurrentBook(response);
      setLoading(false);
    });
  }, []);
  

  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (book) => {
    if (!books.find((b) => b.libro_id=== book.libro_id)) {
      setBooks([...books, book]);
    }
  };

  if (loading) {
    return <div><SpinnerComponent/></div>;
  }

  return (
    <div className="container mt-4">
      <div className="row specific-book-grid">
        {/* Primera columna */}
        <div className="col-md-4">
          <div className="card bg-transparent border-0 p-1">
            <CardSpecific subtitle={currentBook.isbn} />
          </div>
        </div>

        {/* Segunda columna */}
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0">
                <p><strong>Título: </strong> {currentBook.titulo}</p>
                <p><strong>Autor: </strong>{currentBook.autores} </p>
              </div>
            </div>

            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0">
                <Descripcion texto={currentBook.descripcion} />
              </div>
            </div>

            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0">
                <Generos generos={currentBook.generos} />
              </div>
            </div>

            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0 p-1">
                <Informacion
                  No_paginas={currentBook.numero_paginas}
                  editorial={currentBook.editorial}
                  idiomas={currentBook.idioma}
                  fecha_publicacion={currentBook.fecha_publicacion}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="card bg-transparent border-0 p-2">
              <ButtonAdd book={currentBook} onAdd={() => handleAddBook(currentBook)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}