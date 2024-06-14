import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import CustomLink from '../../components/UI/CustomLink/CustomLink';
import IconUsuario from '../../components/UI/Icon/User/Registration';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';

function Registration() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [form, setForm] = useState({
    nombre: '',
    correo_electronico: '',
    contrasena: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login')
    api.post('api/auth/register', form).then((response) => {
      let message = response.message;
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }).catch((error) => {
      toast.error('Error al registrar el usuario');
    });
  }

  return (
    <div className="container mt-5">
      <form className="col-md-6 mx-auto">
        <div className="card p-4">
          <IconUsuario />
          <h3 className="mt-3 mb-4">Registro</h3>
          <Input
            name="nombre"
            type="text"
            placeholder="Nombre de usuario"
            className="form-control mb-3"
            onChange={handleChange}
          />
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
            placeholder="Contraseña"
            className="form-control mb-3"
            onChange={handleChange}
          />
          <Button type='button' className="btn btn-primary btn-block mb-3" onClick={handleSubmit}>
            Registrar
          </Button>

          <CustomLink to="/login" className="d-block text-center">
            Ingresar
          </CustomLink>
        </div>
      </form>
    </div>
  );
}

export default Registration;