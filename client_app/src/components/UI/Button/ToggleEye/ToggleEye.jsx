import React, { useState } from 'react';
import Eye from '../../Icon/ButtonEye/Eye';
import EyeSlash from '../../Icon/ButtonEye/EyeSlash';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import api from '../../../../api';
import { toast } from 'react-toastify';

export default function ToggleEye({estado_leido, libro_id, fetch_data}) {
  console.log(estado_leido);
  const putViewedLibrary = (idlibro) => {
    api.put('api/library/personal_library_update/', {libro_id: idlibro, estado_leido: !estado_leido})
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
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{estado_leido ? 'Leído': 'No leído' }</Tooltip>}
    >
      <div onClick={()=>putViewedLibrary(libro_id)} style={{ cursor: 'pointer' }}>
        {estado_leido ? <Eye /> : <EyeSlash />}
      </div>
    </OverlayTrigger>
  );
}