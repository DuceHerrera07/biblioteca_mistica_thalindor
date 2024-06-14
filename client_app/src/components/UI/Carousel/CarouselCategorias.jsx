import React from 'react';
import Card from '../Card/Card';

export default function CarouselCategorias() {
  return (
    <div id="carouselCategorias" className="carousel container" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'Ficción'} subtitle={'22 libros'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'Misterio'} subtitle={'33 libros'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'Ciencia ficción'} subtitle={'43 libros'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'Poesía'} subtitle={'17 libros'} link={{ href: '#', text: 'Ver más' }} />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'Fantasía'} subtitle={'86 libros'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'Romance'} subtitle={'33 libros'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'Novela historica'} subtitle={'15 libros'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'Teatro'} subtitle={'11 libros'} link={{ href: '#', text: 'Ver más' }} />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'Terror'} subtitle={'14 libros'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'No ficción'} subtitle={'24 libros'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'Infantil y Juvenil'} subtitle={'75 libros'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 mb-4">
              <Card title={'Ensayo'} subtitle={'7 libros'} link={{ href: '#', text: 'Ver más' }} />
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