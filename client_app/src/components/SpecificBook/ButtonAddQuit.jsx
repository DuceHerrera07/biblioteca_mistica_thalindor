import React from 'react';
import Add from '../UI/Icon/ButtonAdd/Add';
import api from '../../api';
import { toast } from 'react-toastify';

const ButtonAddQuit = ({ book_id, en_libreria_personal, fetch_data}) => {

  const handleAddBook = (idlibro) => {
    api.post('api/library/personal_library_add/', {libro_id: idlibro})
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
      fetch_data();
    });
  };

  const handleRemoveBook = (idlibro) => {
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
      fetch_data();
    });
  };

  return (
    <div className="d-flex justify-content-end">
      {!en_libreria_personal && (<button onClick={()=>handleAddBook(book_id)} className="btn btn-outline-dark btn-sm" type="button">
        Agregar &nbsp;<Add/>
      </button>)}
      {en_libreria_personal && (<button onClick={()=>handleRemoveBook(book_id)} className="btn btn-outline-danger btn-sm" type="button">
        Quitar &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
      </button>)}
    </div>
  );
};

export default ButtonAddQuit;