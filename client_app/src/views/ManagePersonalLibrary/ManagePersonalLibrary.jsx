import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import ButtonDelete from '../../components/UI/Button/Delete/ButtonDelete';
import ToggleEye from '../../components/UI/Button/ToggleEye/ToggleEye';
import api from '../../api';
import SpinnerComponent from '../../components/Spinner/SpinnerComponent';
import ButtonAddQuit from '../../components/SpecificBook/ButtonAddQuit';

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
        setBooks(response.books);
        setTotalPages(response.total_pages);
        setTotalBooks(response.total_books);
        setCurrentPage(response.current_page);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handleDelete = (idlibro) => {
    api.delete(`api/library/personal_library_remove/${idlibro}`)
      .then((response) => {
        if (response.message) {
          toast.success(response.message);
        }
      }).catch((error) => {
        if (error.message) {
          toast.warning(error.message);
        }
        else if (error.errors) {
          toast.error(error.errors);
        }
        else {
          toast.error('Ha ocurrido un error');
        }
      }
    ).finally(() => {
      fetchBooks(currentPage);
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const booksByPage = 10;
  let currentBooksByPage = books.length > 0 ? `${(currentPage - 1) * booksByPage + 1} - ${(currentPage * booksByPage) - (booksByPage - books.length)}` : 0;

  return (
    <div className="container mt-4">
      <h1 className="mb-4"><strong>Tu lista</strong></h1>
      <div className='row '>
        <div className="col-11 mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por título"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className='col-1'>
          <button className="btn btn-primary col-12" onClick={()=>fetchBooks(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
          </button>
        </div>  
      </div>    
      {books.length == 0 && !loading && <div className="alert alert-warning text-black text-center" role="alert">
        No se encontraron libros.
      </div>}
      {loading && books.length == 0 && <SpinnerComponent />}
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
              <th scope="col" className='text-center'>Estado del libro</th>
              <th scope="col" className='text-center'>Eliminar libro</th>
            </tr>
          </thead>

          <tbody>
          {books.map(b => (
              <tr key={b.libro.libro_id}>
                <td className="">
                  <Link to={`/specificBook/${b.libro.libro_id}`} className="text-reset text-decoration-none">{b.libro.titulo}</Link>
                </td>
                <td className="">{b.libro.autores.join(', ')}</td>
                <td className="">{b.libro.editorial}</td>
                <td className="">{b.libro.fecha_publicacion}</td>
                <td className="">{b.libro.isbn}</td>
                <td className="">{b.libro.numero_paginas}</td>
                <td className="">{b.libro.generos.join(', ')}</td>
                <td className="">{b.libro.idioma}</td>
                <td className="text-center">
                  <ToggleEye estado_leido={b.estado_leido} libro_id={b.libro.libro_id} fetch_data={() => fetchBooks(currentPage)} />
                </td>
                <td className="col-1 text-center">
                  <ButtonDelete onDelete={() => handleDelete(b.libro.libro_id)} />
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
