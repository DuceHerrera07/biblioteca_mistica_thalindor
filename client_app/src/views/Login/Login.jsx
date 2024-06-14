import React, { useEffect } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import CustomLink from '../../components/UI/CustomLink/CustomLink';
import IconUsuario from '../../components/UI/Icon/User/User';

import api from '../../api';

function Login() {
  useEffect(() => {
    // Desactivar scroll cuando el componente se monta
    document.body.style.overflow = 'hidden';

    // Limpiar al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <div className="container mt-5">
      <form className="col-md-6 mx-auto">
        <div className="card p-4">
          <IconUsuario />
          <h3 className="mt-3 mb-4">Iniciar sesión</h3>
          <Input
            name="Correo electrónico"
            type="email"
            placeholder="Ingrese su correo electrónico"
            className="form-control mb-3"
          />
          <Input
            name="Contraseña"
            type="password"
            placeholder="Ingrese su contraseña"
            className="form-control mb-3"
          />
          <Button type="submit" className="btn btn-primary btn-block mb-3">
            Ingresar
          </Button>
          <CustomLink to="/registration" className="d-block text-center">
            Registrarse
          </CustomLink>
        </div>
      </form>
    </div>
  );
}

export default Login;