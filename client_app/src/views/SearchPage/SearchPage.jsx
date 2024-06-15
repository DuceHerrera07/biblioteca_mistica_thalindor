import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Pagination, Form } from 'react-bootstrap';
import api from '../../api';
import SpinnerComponent from '../../components/Spinner/SpinnerComponent';
import { SearchContext } from '../../../Context/SearchContext';
import { NavLink } from 'react-router-dom';

function SearchPage() {
  // Filtros
  const { searchTerm, updateSearchTerm} = useContext(SearchContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ordenarPorPopulares, setOrdenarPorPopulares] = useState(false);

  // Peticiones
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  // Estados de la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total_books, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBooks = (page) => {
    setLoading(true);
    const data_search_filter = {
      search: searchTerm,
      categoria: selectedCategory,
      ordenar_por_populares: ordenarPorPopulares,
      page: page,
    };

    api.get('api/library/genres')
      .then((response) => {
        setCategories(response);
      })
    api.post('api/library/search_books', data_search_filter)
      .then((response) => {
        setBooks(response.books);
        setTotalPages(response.total_pages);
        setCurrentPage(response.current_page);
        setTotalBooks(response.total_books);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (e) => {
    setOrdenarPorPopulares(e.target.value === 'true');
    setCurrentPage(1);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    updateSearchTerm(e.target.value);
  };

  const booksByPage = 50;
  let currentBooksByPage = books.length > 0 ? `${(currentPage - 1) * booksByPage + 1} - ${(currentPage * booksByPage) - (booksByPage - books.length)}` : 0;

  return (
    <Container className="mt-4">
      <Row>  
        <Col md={12} className="d-flex justify-content-between align-items-center mb-4">
          <h2>Libros</h2>
          <div>
            <i className="bi bi-bell mx-2"></i>
            <i className="bi bi-heart mx-2"></i>
            <i className="bi bi-person-circle mx-2"></i>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-between align-items-center mb-4">
        <Col md={6}>
          <Form.Select aria-label="Filtrar por categoría" onChange={handleCategoryChange}>
            <option value="">Todas las categorías</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.genero_id}>{cat.descripcion}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={6} className="text-end">
          <Form.Select aria-label="Ordenar por" onChange={handleSortOrderChange}>
            <option value={false}>Por defecto</option>
            <option value={true}>Más populares</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="justify-content-between align-items-center mb-4">
        <Col md={11}>
          <Form.Control type="text" placeholder="Buscar titulo" value={searchTerm} onChange={(e) => handleSearchChange(e)} />
        </Col>
        <Col md={1} className="text-end">
          <button className="btn btn-primary" onClick={()=>fetchBooks(1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </button>
        </Col>
      </Row>
      {books.length == 0 && <div className="alert alert-warning text-black text-center" role="alert">
        No se encontraron libros.
      </div>}
      {books.length != 0 && (<Row className="justify-content-between align-items-center">
        <Col md={6}>
          <Pagination>
            <Pagination.Prev
              onClick={() => handleClick(currentPage > 1 ? currentPage - 1 : 1)}
            />
            {Array.from({ length: totalPages }).map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === currentPage}
                onClick={() => handleClick(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handleClick(currentPage < totalPages ? currentPage + 1 : totalPages)}
            />
          </Pagination>
        </Col>
        <Col md={6} className="text-end pb-3 pe-3">
          <span>{currentBooksByPage} de {total_books}</span>
        </Col>
      </Row>)}
      {loading ? <div style={{height: '400px'}}><SpinnerComponent /> </div>: books.length != 0 && (
        <Row>
          {books.map((book, idx) => (
            <Col key={idx} md={3} className="mb-4">
              <Card style={{ height: '450px' }}>
                <Card.Img variant="top" src={'https://via.placeholder.com/250'} height={250} width={250} />
                <Card.Body>
                  <Card.Title>{`Título: ${book.titulo}`}</Card.Title>
                  <Card.Text>{`Autor(es): ${book.autores.join(', ')}`}</Card.Text>
                  <Card.Text>
                    <small>{`Género(s): ${book.generos.join(', ')}`}</small>
                  </Card.Text>
                  <Card.Text>
                    <NavLink to={`/specificBook/${book.libro_id}`}>Ver más</NavLink>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {books.length != 0 && ( <Row className="justify-content-between align-items-center">
        <Col md={6}>
          <Pagination>
            <Pagination.Prev
              onClick={() => handleClick(currentPage > 1 ? currentPage - 1 : 1)}
            />
            {Array.from({ length: totalPages }).map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === currentPage}
                onClick={() => handleClick(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handleClick(currentPage < totalPages ? currentPage + 1 : totalPages)}
            />
          </Pagination>
        </Col>
        <Col md={6} className="text-end pb-4 px-4">
          <span>{currentBooksByPage} de {total_books}</span>
        </Col>
      </Row>)}
    </Container>
  );
}

export default SearchPage;
