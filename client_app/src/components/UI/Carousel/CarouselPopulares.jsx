import React from 'react';
import Card from '../Card/Card';

export default function CarouselPopulares() {
  return (
    <div id="carouselPopulares" className="carousel slide container" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4">
              <Card title={'Cien años de soledad'} subtitle={'Autor: Gabriel García'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-lg-3 col-md-4">
              <Card title={'El nombre de la rosa'} subtitle={'Autor: Umberto Eco'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-lg-3 col-md-4">
              <Card title={'Dune'} subtitle={'Autor: Frank Herbert'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-lg-3 col-md-4">
              <Card title={'Cien sonetos de amor'} subtitle={'Autor: Pablo Neruda'} link={{ href: '#', text: 'Ver más' }} />
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4">
              <Card title={'El señor de los anillos'} subtitle={'Autor: J.R.R. Tolkien'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-lg-3 col-md-4">
              <Card title={'Orgullo y prejuicio'} subtitle={'Autor: Jane Austen'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-lg-3 col-md-4">
              <Card title={'Los pilares de la tierra'} subtitle={'Autor: Ken Follett'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-lg-3 col-md-4">
              <Card title={'Hamlet'} subtitle={'Autor: William Shakespeare'} link={{ href: '#', text: 'Ver más' }} />
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4">
              <Card title={'El resplandor'} subtitle={'Autor: Stephen King'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-lg-3 col-md-4">
              <Card title={'Sapiens'} subtitle={'Autor: Yuval Noah Harari'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-lg-3 col-md-4">
              <Card title={'Harry Potter'} subtitle={'Autor: J.K. Rowling'} link={{ href: '#', text: 'Ver más' }} />
            </div>
            <div className="col-lg-3 col-md-4">
              <Card title={'Entendimiento humano'} subtitle={'Autor: John Locke'} link={{ href: '#', text: 'Ver más' }} />
            </div>
          </div>
        </div>
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