import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import SpinnerComponent from '../../Spinner/SpinnerComponent';
import api from '../../../api'; 

export default function CarouselCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('api/categorias/top10');
        setCategorias(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categorias:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div style={{height: '100vh'}}><SpinnerComponent/></div>;
  }
  return (
    <div id="carouselCategorias" className="carousel container" data-bs-ride="carousel">
      <div className="carousel-inner">
        {categorias.map((categoria, index) => (
        <div className="carousel-item active">
          <div className="row justify-content-center">
          {categoria.libros.map((libro, libroIndex) => (
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={categoria.nombre} subtitle={`${libro.cantidad} libros`} link={{ href: '#', text: 'Ver más' }} />
            </div>
            ))}
          </div>
        </div>
        ))}
        <div className="carousel-item">
          <div className="row justify-content-center">

            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={''} subtitle={''} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={''} subtitle={''} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={''} subtitle={''} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={''} subtitle={''} link={{ href: '#', text: 'Ver más' }} />
            </div>

          </div>
        </div>

        <div className="carousel-item">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={''} subtitle={''} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={''} subtitle={''} link={{ href: '#', text: 'Ver más' }} />
            </div>
          </div>
        </div>
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