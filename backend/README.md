# Biblioteca Mística Thalindor - Backend

Este es el backend para la aplicación Biblioteca Mística Thalindor. Este proyecto está escrito en Python y utiliza Flask como framework web.

## Requisitos

- Python 3.8 o superior

## Instalación

1. Clona este repositorio en tu máquina local.

```bash
git clone https://github.com/DuceHerrera07/biblioteca_mistica_thalindor.git
```

2. Navega al directorio del proyecto.

```bash
cd biblioteca_mistica_thalindor/backend
```

3. Recomendamos usar un entorno virtual para instalar las dependencias del proyecto. Puedes crear un entorno virtual usando `venv` ( o el que te cante el * :D ). Aquí tienes un ejemplo de cómo crear un entorno virtual con `venv`:

```bash
python3 -m venv venv
```

4. Activa el entorno virtual:

- En Windows:

```bash
.\venv\Scripts\activate
```

- En Unix o MacOS:

```bash
source venv/bin/activate
```

5. Instala las dependencias del proyecto:

```bash
pip install -r requirements.txt
```

## Configuración

Antes de iniciar el servidor, necesitas configurar las variables de entorno para la base de datos. Estas variables deben ser establecidas en un archivo `.env` en el directorio raíz del proyecto.

Aquí tienes un ejemplo de cómo podría verse tu archivo `.env`:

```bash
SECRET_KEY=una_clave_secreta_muy_dificil
DATABASE_URL=postgresql://user:password@hostname:5432/nombre_de_tu_base_de_datos
JWT_SECRET_KEY=otra_clave_secreta_muy_dificil

```

## Uso

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
flask run --host=0.0.0.0 --debug
```

El servidor se iniciará en modo de depuración. Ahora puedes acceder a la aplicación en tu navegador web en `http://localhost:5000`.

