import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import CustomLink from '../../components/UI/CustomLink/CustomLink';
import IconUsuario from '../../components/UI/Icon/User/User';
import { useNavigate} from 'react-router-dom';
import api from '../../api';
import { toast } from 'react-toastify';

function Login() {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const navigate = useNavigate();

  const [form, setForm] = useState({
    correo_electronico: '',
    contrasena: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = () => {
    api.post('api/auth/login', form).then((response) => {
      api.setToken(response.access_token);
      toast.success('Inicio de sesión correcto', {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    })
    .catch((exception) => {
      if (exception.error) {
        toast.error(exception.error);
      } else if (exception.errors) {
        toast.error(exception.errors);
      }
      else {
        toast.error('Error al iniciar sesión');
      }
    });
  }

  return (
    
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <form className="col-md-6 mx-auto align-items-center">
        <div className="card p-4 shadow-lg">
          <IconUsuario />
          <h3 className="mt-3 mb-4 text-center">Iniciar sesión</h3>
          <Input
            name="correo_electronico"
            type="email"
            placeholder="Ingrese su correo electrónico"
            className="form-control mb-3"
            onChange={handleChange}
          />
          <Input
            name="contrasena"
            type="password"
            placeholder="Ingrese su contraseña"
            className="form-control mb-3"
            onChange={handleChange}
          />
          <Button type="button" className="btn btn-primary btn-block mb-3" onClick={handleSubmit}>
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