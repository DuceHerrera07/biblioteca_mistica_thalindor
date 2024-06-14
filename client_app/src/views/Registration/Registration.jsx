import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import CustomLink from '../../components/UI/CustomLink/CustomLink';
import IconUsuario from '../../components/UI/Icon/User/Registration';
import { useNavigate } from 'react-router-dom';
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los datos antes de enviar la solicitud POST
    if (!form.nombre || !form.correo_electronico || !form.contrasena) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    api.post('api/auth/register', form)
      .then((response) => {
        let message = response.message || 'Usuario registrado correctamente';
        toast.success(message, {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          toast.info('Redirigiendo al inicio de sesión...' , {
            position: "top-right",
            autoClose: 2000,
          });
        }, 2000);
        setTimeout(() => {
          navigate('/login');
        }, 4500);
      })
      .catch((exception) => {
        if (exception.error) {
          toast.error(exception.error);
        } else if (exception.errors) {
          toast.error(exception.errors);
        }
        else {
          toast.error('Error al registrar el usuario');
        }
      });
  };

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