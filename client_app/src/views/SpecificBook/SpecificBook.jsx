import React, { useState, useEffect } from 'react';
import CardSpecific from '../../components/SpecificBook/CardSpecific';
import Descripcion from '../../components/SpecificBook/Descripcion';
import Generos from '../../components/SpecificBook/Generos';
import Informacion from '../../components/SpecificBook/Informacion';
import { useParams } from 'react-router-dom';
import api from '../../api';
import SpinnerComponent from '../../components/Spinner/SpinnerComponent';
import { toast } from 'react-toastify';
import ButtonAddQuit from '../../components/SpecificBook/ButtonAddQuit';


export default function SpecificBook() {
  const { idlibro } = useParams();
  const [currentBook, setCurrentBook] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchBook = () => {
    api.get(`api/library/books/${idlibro}`).then((response) => {
      setCurrentBook(response);
      setLoading(false);
    });
  };

  useEffect(() => {
   fetchBook();
  }, []);

  if (loading) {
    return <div style={{height: '100vh'}}><SpinnerComponent/></div>;
  }

  return (
    <div className="container mt-4">
      <div className="row specific-book-grid">
        {/* Primera columna */}
        <div className="col-md-4">
          <div className="card bg-transparent border-0 p-1">
            <CardSpecific subtitle={currentBook.isbn} />
          </div>
        </div>

        {/* Segunda columna */}
        <div className="col-md-8">
          <div className="row mt-4">
            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0">
                <p><strong>Título: </strong> {currentBook.titulo}</p>
                <p><strong>Autor: </strong>{currentBook.autores} </p>
              </div>
            </div>

            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0">
                <Descripcion texto={currentBook.descripcion} />
              </div>
            </div>

            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0">
                <Generos generos={currentBook.generos} />
              </div>
            </div>

            <div className="col-md-12 mb-2">
              <div className="card bg-transparent border-0 p-1">
                <Informacion
                  No_paginas={currentBook.numero_paginas}
                  editorial={currentBook.editorial}
                  idiomas={currentBook.idioma}
                  fecha_publicacion={currentBook.fecha_publicacion}
                  en_libreria_personal={currentBook.en_libreria_personal}
                  estado_leido={currentBook.estado_leido}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="card bg-transparent border-0 p-2">
                <ButtonAddQuit book_id={idlibro} en_libreria_personal={currentBook.en_libreria_personal} fetch_data={()=>fetchBook()}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}