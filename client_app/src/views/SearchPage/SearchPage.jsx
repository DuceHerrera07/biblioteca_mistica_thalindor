import React, { useState } from 'react';
import { Container, Row, Col, Card, Pagination, Form } from 'react-bootstrap';

const categories = ['Ficción', 'No Ficción', 'Ciencia', 'Historia'];
const fakeBooks = Array.from({ length: 150 }).map((_, idx) => ({
  id: idx + 1,
  title: `Libro ${idx + 1}`,
  author: `Autor ${idx + 1}`,
  image: 'https://via.placeholder.com/250',
  category: categories[Math.floor(Math.random() * categories.length)],
  popularity: Math.floor(Math.random() * 100), // Popularidad aleatoria
}));


function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortOrder, setSortOrder] = useState('default');
  const booksPerPage = 52;

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredBooks = selectedCategory === 'Todos'
    ? fakeBooks
    : fakeBooks.filter(book => book.category === selectedCategory);

  const sortedBooks = sortOrder === 'popularity'
    ? filteredBooks.sort((a, b) => b.popularity - a.popularity)
    : filteredBooks;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
            {categories.map((category, idx) => (
              <option key={idx} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={6} className="text-end">
          <Form.Select aria-label="Ordenar por" onChange={handleSortOrderChange}>
            <option value="default">Por defecto</option>
            <option value="popularity">Más populares</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {currentBooks.map((book) => (
          <Col key={book.id} md={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={book.image} height={250} width={250} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Card.Text><small>{book.category}</small></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-between align-items-center">
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
          <span>{currentPage} de {totalPages}</span>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchPage;
