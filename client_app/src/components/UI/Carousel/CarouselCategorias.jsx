import React, { useState, useEffect, useContext } from 'react';
import Card from '../Card/Card';
import api from '../../../api';
import SpinnerComponent from '../../Spinner/SpinnerComponent';
import { SearchContext } from '../../../../Context/SearchContext';


export default function CarouselCategorias() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { updateSelectedCategory } = useContext(SearchContext);

  useEffect(() => {
    api.get('api/library/top_categories')
      .then((response) => { 
        setCategories(response); 
        setLoading(false);
      })
      .catch(error => console.error('Error fetching top categories:', error));
  }, []);

  if (loading) {
    return (
      <SpinnerComponent />
    );
  }

  const groupedCategories = [];
  for (let i = 0; i < categories.length; i += 3) {
    groupedCategories.push(categories.slice(i, i + 3));
  }

  return (
    <div id="carouselCategorias" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {groupedCategories.map((group, idx) => (
          <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
            <div className="row justify-content-center">
              {group.map((category, categoryIdx) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={categoryIdx}>
                  <Card
                    title={category.descripcion}
                    subtitle={`${category.count} libros`}
                    link={{ href: `/search`, text: 'Ver más' }}
                    onClickSelectedCategory={() => updateSelectedCategory(category.genero_id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <a className="carousel-control-prev custom-carousel-control rounded-circle bg-primary text-white" href="#carouselCategorias" role="button" data-bs-slide="prev" title="Anterior" style={{ width: '40px', height: '40px', top: '50%', transform: 'translateY(-50%)', marginLeft: '-50px' }}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a className="carousel-control-next custom-carousel-control rounded-circle bg-primary text-white" href="#carouselCategorias" role="button" data-bs-slide="next" title="Siguiente" style={{ width: '40px', height: '40px', top: '50%', transform: 'translateY(-50%)', marginRight: '-50px' }}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
    </div>
  );
}
