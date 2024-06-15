import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonDelete from '../../components/UI/Button/Delete/ButtonDelete';
import ToggleEye from '../../components/UI/Button/ToggleEye/ToggleEye';

function ManagePersonalLibrary() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleDelete = (idlibro) => {
    setBooks(books.filter(book => book.idlibro !== idlibro));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4"><strong>Tu lista</strong></h1>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Autor</th>
              <th scope="col">Editorial</th>
              <th scope="col">Fecha de publicación</th>
              <th scope="col">ISBN</th>
              <th scope="col">Número de páginas</th>
              <th scope="col">Géneros</th>
              <th scope="col">Idioma</th>
              <th scope="col">Estado del libro</th>
              <th scope="col">Eliminar libro</th>
            </tr>
          </thead>

          <tbody>
            {books.map(book => (
              <tr key={book.idlibro}>
                <td className="text-center">
                  <Link to={`/specificBook/${book.idlibro}`} className="text-reset text-decoration-none">{book.titulo}</Link>
                </td>
                <td className="text-center">{book.autores}</td>
                <td className="text-center">{book.editorial}</td>
                <td className="text-center">{book.fecha_publicacion}</td>
                <td className="text-center">{book.isbn}</td>
                <td className="text-center">{book.numero_paginas}</td>
                <td className="text-center">{book.generos.join(', ')}</td>
                <td className="text-center">{book.idioma}</td>
                <td className="text-center">
                  <ToggleEye />
                </td>
                <td className="col-1 text-center">
                  <ButtonDelete onDelete={() => handleDelete(book.idlibro)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagePersonalLibrary;