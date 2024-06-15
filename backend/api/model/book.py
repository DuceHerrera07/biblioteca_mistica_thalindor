from api.extensions import db

class Book(db.Model):
    __tablename__ = 'libros'

    libro_id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    editorial = db.Column(db.String(255))
    fecha_publicacion = db.Column(db.Date)
    isbn = db.Column(db.String(255), unique=True, nullable=False)
    numero_paginas = db.Column(db.Integer)
    idioma = db.Column(db.String(100))
    descripcion = db.Column(db.Text)

    # Relaciones
    autores = db.relationship('Author', secondary='libros_autores', back_populates='libros')
    generos = db.relationship('Genre', secondary='libros_generos', back_populates='libros')
    biblioteca_personal = db.relationship('PersonalLibrary', back_populates='libro')
