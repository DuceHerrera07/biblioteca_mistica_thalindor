import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import api from '../../../api';
import SpinnerComponent from '../../Spinner/SpinnerComponent';

export default function CarouselPopulares() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('api/library/top_books')
      .then((response) => {
        setBooks(response); 
        setLoading(false);
      })
      .catch(error => console.error('Error fetching top books:', error));
  }, []);

  if (loading) {
    return <SpinnerComponent />;
  }

  const groupedBooks = [];
  for (let i = 0; i < books.length; i += 3) {
    groupedBooks.push(books.slice(i, i + 3));
  }

  return (
    <div id="carouselPopulares" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {groupedBooks.map((group, idx) => (
          <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
            <div className="row justify-content-center">
              {group.map((book, bookIdx) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={bookIdx}>
                  <Card
                    title={book.titulo}
                    subtitle={`Autor: ${book.autores.join(', ')}`}
                    link={{ href: `/specificBook/${book.libro_id}`, text: 'Ver más' }}
                    rating={{
                      text: 'Guardados',
                      count: book.cantidad_guardados
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <a className="carousel-control-prev custom-carousel-control rounded-circle bg-primary text-white" href="#carouselPopulares" role="button" data-bs-slide="prev" title="Anterior" style={{ width: '40px', height: '40px', top: '50%', transform: 'translateY(-50%)', marginLeft: '-50px' }}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a className="carousel-control-next custom-carousel-control rounded-circle bg-primary text-white" href="#carouselPopulares" role="button" data-bs-slide="next" title="Siguiente" style={{ width: '40px', height: '40px', top: '50%', transform: 'translateY(-50%)', marginRight: '-50px' }}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
    </div>
  );
}
