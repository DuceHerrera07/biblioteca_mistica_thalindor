import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import ButtonDelete from '../../components/UI/Button/Delete/ButtonDelete';
import ToggleEye from '../../components/UI/Button/ToggleEye/ToggleEye';
import api from '../../api';
import SpinnerComponent from '../../components/Spinner/SpinnerComponent';

function ManagePersonalLibrary() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBooks = (page) => {
    setLoading(true);
    const data = {
      search: searchTerm,
      page: page,
    };

    api.post('api/library/personal_library', data)
      .then((response) => {
        setBooks(response.data.books);
        setTotalPages(response.data.total_pages);
        setTotalBooks(response.data.total_books);
        setCurrentPage(response.data.current_page);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage, searchTerm]);

  const handleDelete = (idlibro) => {
    api.delete(`api/library/personal_library/${idlibro}`)
      .then(() => {
        setBooks(books.filter(book => book.idlibro !== idlibro));
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const booksByPage = 10;
  let currentBooksByPage = books.length > 0 ? `${(currentPage - 1) * booksByPage + 1} - ${(currentPage * booksByPage) - (booksByPage - books.length)}` : 0;

  if (loading) {
    return <SpinnerComponent />;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4"><strong>Tu lista</strong></h1>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por título"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {books.length == 0 && <div className="alert alert-warning text-black text-center" role="alert">
        No se encontraron libros.
      </div>}
      {books.length != 0 && (<div className="table-responsive">
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
                <td className="text-center">{book.autores.join(', ')}</td>
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
      </div>)}
      {books.length != 0 && ( <div className="d-flex justify-content-between align-items-center mt-4">
        <span className='ps-1'>{currentBooksByPage} de {totalBooks}</span>
        <Pagination>
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          />
          {Array.from({ length: totalPages }).map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
          />
        </Pagination>
      </div> )}
    </div>
  );
}

export default ManagePersonalLibrary;
