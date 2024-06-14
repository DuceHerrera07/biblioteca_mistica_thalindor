import React from 'react';
import CarouselCategorias from '../../components/UI/Carousel/CarouselCategorias';
import CarouselPopulares from '../../components/UI/Carousel/CarouselPopulares';

function Home() {
  return (
    <div className="container-fluid">
      <div className="row mx-2">
        <h3 className="mb-1"><strong>Categorías</strong></h3>
        <div className="col-md-10 mx-auto">
         <CarouselCategorias />
        </div>

      </div>

      <div className="row mx-2">
        <h3 className="mb-1"><strong>Populares</strong></h3>
        <div className="col-md-10 mx-auto" >
         <CarouselPopulares />
        </div>
      </div>
    </div>
  );
}

export default Home;