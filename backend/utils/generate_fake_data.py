import os
import random
from faker import Faker
import psycopg2
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Configurar Faker
fake = Faker()

# Conectar a la base de datos
DATABASE_URL = os.getenv('DATABASE_URL')
print(f"Conectando a la base de datos en {DATABASE_URL}")
conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

# Truncar tablas para evitar conflictos
cur.execute("TRUNCATE TABLE biblioteca_personal, libros_generos, libros_autores, libros, autores, generos, usuarios RESTART IDENTITY CASCADE;")

# Crear usuarios falsos
for _ in range(5):
    nombre = fake.name()
    correo_electronico = fake.email()
    contrasena_hash = fake.sha256()
    cur.execute("INSERT INTO usuarios (nombre, correo_electronico, contrasena_hash) VALUES (%s, %s, %s)",
                (nombre, correo_electronico, contrasena_hash))

# Crear géneros falsos
generos = [fake.word() for _ in range(10)]
for genero in generos:
    cur.execute("INSERT INTO generos (descripcion) VALUES (%s)", (genero,))

# Crear autores falsos
autores = [fake.name() for _ in range(50)]
for autor in autores:
    cur.execute("INSERT INTO autores (nombre) VALUES (%s)", (autor,))

# Crear libros falsos
for _ in range(150):
    titulo = fake.sentence(nb_words=4)
    editorial = fake.company()
    fecha_publicacion = fake.date()
    isbn = fake.isbn13()
    numero_paginas = fake.random_int(min=100, max=1000)
    idioma = fake.language_name()
    cur.execute("""
        INSERT INTO libros (titulo, editorial, fecha_publicacion, isbn, numero_paginas, idioma)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING libro_id
    """, (titulo, editorial, fecha_publicacion, isbn, numero_paginas, idioma))
    libro_id = cur.fetchone()[0]

    # Asignar autores al libro
    autor_ids = set()
    while len(autor_ids) < random.randint(1, 3):
        autor_id = random.randint(1, len(autores))
        if autor_id not in autor_ids:
            autor_ids.add(autor_id)
            cur.execute("INSERT INTO libros_autores (libro_id, autor_id) VALUES (%s, %s)", (libro_id, autor_id))

    # Asignar géneros al libro
    genero_ids = set()
    while len(genero_ids) < random.randint(1, 3):
        genero_id = random.randint(1, len(generos))
        if genero_id not in genero_ids:
            genero_ids.add(genero_id)
            cur.execute("""
                INSERT INTO libros_generos (libro_id, genero_id)
                VALUES (%s, %s)
                ON CONFLICT DO NOTHING
            """, (libro_id, genero_id))

# Guardar cambios y cerrar conexión
conn.commit()
cur.close()
conn.close()

print("Datos falsos generados e insertados exitosamente.")
