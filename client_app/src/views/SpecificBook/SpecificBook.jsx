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

  if (loading) {
    return <div><SpinnerComponent/></div>;
  }

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
                <Descripcion texto={currentBook.descripcion} />
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