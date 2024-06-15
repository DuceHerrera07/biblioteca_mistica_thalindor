from flask import Blueprint, request, jsonify
from api.extensions import db
from api.model.book import Book
from api.model.genre import Genre
from api.model.personal_library import PersonalLibrary
from api.schema.book_schema import BookSchema
from api.schema.genre_schema import GenreSchema
from api.schema.personal_library_schema import PersonalLibrarySchema
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from sqlalchemy.orm import joinedload
from sqlalchemy import func

library_bp = Blueprint('library', __name__)
book_schema = BookSchema()
books_schema = BookSchema(many=True)
personal_library_schema = PersonalLibrarySchema(many=True)
genre_schema = GenreSchema()
genres_schema = GenreSchema(many=True)

@library_bp.route('/personal_library', methods=['POST'])
@jwt_required()
def get_personal_library():
    """
    Get the personal library of the authenticated user with pagination and search functionality.

    This endpoint allows the client to retrieve the list of books in the personal library of the currently authenticated user
    with pagination and search filters.

    Returns:
        JSON: A response containing the list of books in the personal library.

    Example JSON body:
        {
            "search": "some title",
            "page": 1
        }

    Example response:
        {
            "total_pages": 2,
            "current_page": 1,
            "books": [
                {
                    "titulo": "Book Title",
                    "autores": ["Author 1", "Author 2"],
                    "editorial": "Editorial Name",
                    "fecha_publicacion": "2023-01-01",
                    "isbn": "1234567890123",
                    "numero_paginas": 300,
                    "genero": ["Genre 1", "Genre 2"],
                    "idioma": "Español",
                    "estado_leido": true
                }
            ]
        }
    """
    try:
        data = request.get_json()
        search = data.get('search', '')
        page = data.get('page', 1)
        books_per_page = 10

        current_user_id = get_jwt_identity()

        query = PersonalLibrary.query.filter_by(usuario_id=current_user_id)
        
        if search:
            query = query.join(Book).filter(Book.titulo.ilike(f'%{search}%'))
            
        total_books = query.count()
        personal_library = query.paginate(page=page, per_page=books_per_page, error_out=False)

        result = personal_library_schema.dump(personal_library.items)
        
        response = {
            "total_pages": personal_library.pages,
            "total_books": total_books,
            "current_page": page,
            "books": result
        }

        return jsonify(response), 200

    except ValidationError as err:
        return jsonify({'errors': err.messages}), 422
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@library_bp.route('/personal_library_add/', methods=['POST'])
@jwt_required()
def add_to_personal_library():
    """
    Add a book to the personal library of the authenticated user.

    This endpoint allows the client to add a book to the personal library of the currently authenticated user.

    Returns:
        JSON: A response indicating the success or failure of the operation.

    Example JSON body:
        {
            "libro_id": 1
        }

    Example response:
        {
            "message": "Libro agregado a la biblioteca personal"
        }
    """
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        libro_id = data['libro_id']

        if PersonalLibrary.query.filter_by(usuario_id=current_user_id, libro_id=libro_id).first():
            return jsonify({'message': 'El libro ya está en la biblioteca personal'}), 400

        new_entry = PersonalLibrary(usuario_id=current_user_id, libro_id=libro_id)
        db.session.add(new_entry)
        db.session.commit()

        return jsonify({'message': 'Libro agregado a la biblioteca personal'}), 201

    except ValidationError as err:
        return jsonify({'errors': err.messages}), 422
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@library_bp.route('/personal_library_update/', methods=['PUT'])
@jwt_required()
def update_personal_library():
    """
    Update the read status of a book in the personal library of the authenticated user.

    This endpoint allows the client to update the read status of a book in the personal library of the currently authenticated user.

    Returns:
        JSON: A response indicating the success or failure of the operation.

    Example JSON body:
        {
            "libro_id": 1,
            "estado_leido": true
        }
        
    Example response:
        {
            "message": "Estado de lectura actualizado"
        }
    """
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        libro_id = data['libro_id']
        estado_leido = data['estado_leido']

        entry = PersonalLibrary.query.filter_by(usuario_id=current_user_id, libro_id=libro_id).first()

        if not entry:
            return jsonify({'message': 'El libro no está en la biblioteca personal'}), 404

        entry.estado_leido = estado_leido
        db.session.commit()

        return jsonify({'message': 'Estado de lectura actualizado'}), 200

    except ValidationError as err:
        return jsonify({'errors': err.messages}), 422
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@library_bp.route('/personal_library_remove/<int:libro_id>', methods=['DELETE'])
@jwt_required()
def remove_from_personal_library(libro_id):
    """
    Remove a book from the personal library of the authenticated user.

    This endpoint allows the client to remove a book from the personal library of the currently authenticated user.

    Returns:
        JSON: A response indicating the success or failure of the operation.

    Example response:
        {
            "message": "Libro eliminado de la biblioteca personal"
        }
    """
    try:
        current_user_id = get_jwt_identity()
        entry = PersonalLibrary.query.filter_by(usuario_id=current_user_id, libro_id=libro_id).first()

        if not entry:
            return jsonify({'message': 'El libro no está en la biblioteca personal'}), 404

        db.session.delete(entry)
        db.session.commit()

        return jsonify({'message': 'Libro eliminado de la biblioteca personal'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@library_bp.route('/search_books', methods=['POST'])
@jwt_required()
def search_books():
    """
    Search for books in the system.

    This endpoint allows the client to search for books in the system and retrieve a paginated list of results based on filters.

    Returns:
        JSON: A response containing the list of books matching the search criteria.

    Example JSON body:
        {
            "search": "some title",
            "categoria": "Fantasy",
            "ordenar_por_populares": true,
            "page": 1
        }

    Example response:
        {
            "total_pages": 2,
            "current_page": 1,
            "books": [
                {
                    "titulo": "Book Title",
                    "autores": ["Author 1", "Author 2"],
                    "editorial": "Editorial Name",
                    "fecha_publicacion": "2023-01-01",
                    "isbn": "1234567890123",
                    "numero_paginas": 300,
                    "genero": ["Genre 1", "Genre 2"],
                    "idioma": "Español"
                }
            ]
        }
    """
    try:
        data = request.get_json()
        search = data.get('search', '')
        categoria = data.get('categoria', '')
        ordenar_por_populares = data.get('ordenar_por_populares', False)
        page = data.get('page', 1)
        books_per_page = 50

        query = Book.query.options(joinedload(Book.autores), joinedload(Book.generos))
        
        if search:
            query = query.filter(Book.titulo.ilike(f'%{search}%'))
        
        if categoria:
            if int(categoria) > 0:
                query = query.join(Book.generos).filter(Genre.genero_id == int(categoria))
        
        if ordenar_por_populares:
            query = query.outerjoin(PersonalLibrary).group_by(Book.libro_id).order_by(func.count(PersonalLibrary.libro_id).desc())

        total_books = query.count()
        books = query.paginate(page=page, per_page=books_per_page, error_out=False)

        result = []
        for book in books.items:
            result.append({
                "libro_id": book.libro_id,
                "titulo": book.titulo,
                "autores": [author.nombre for author in book.autores],
                "editorial": book.editorial,
                "fecha_publicacion": book.fecha_publicacion,
                "isbn": book.isbn,
                "numero_paginas": book.numero_paginas,
                "generos": [genre.descripcion for genre in book.generos],
                "idioma": book.idioma
            })
        response = {
            "total_pages": books.pages,
            "total_books": total_books,
            "current_page": page,
            "books": result
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@library_bp.route('/books/<int:libro_id>', methods=['GET'])
@jwt_required()
def get_book(libro_id):
    """
    Get the details of a specific book by its ID.

    This endpoint allows the client to retrieve the details of a specific book by providing its ID.

    Returns:
        JSON: A response containing the details of the book.

    Example response:
        {
            "titulo": "Book Title",
            "autores": ["Author 1", "Author 2"],
            "descripcion": "Book Description",
            "editorial": "Editorial Name",
            "fecha_publicacion": "2023-01-01",
            "isbn": "1234567890123",
            "numero_paginas": 300,
            "genero": ["Genre 1", "Genre 2"],
            "idioma": "Español"
        }
    """
    try:
        book = Book.query.get(libro_id)
        if not book:
            return jsonify({'message': 'Libro no encontrado'}), 404
        
        result = book_schema.dump(book)
        result['autores'] = [author.nombre for author in book.autores]
        result['generos'] = [genre.descripcion for genre in book.generos]
        
        current_user_id = get_jwt_identity()
        entry = PersonalLibrary.query.filter_by(usuario_id=current_user_id, libro_id=libro_id).first()
        result['en_libreria_personal'] = True if entry else False
        result['estado_leido'] = entry.estado_leido if entry else False
        return jsonify(result), 200

    except ValidationError as err:
        return jsonify({'errors': err.messages}), 422
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@library_bp.route('/genres', methods=['GET'])
@jwt_required()
def get_genres():
    """
    Get all genres (categories) in the system.

    This endpoint allows the client to retrieve a list of all genres in the system.

    Returns:
        JSON: A response containing the list of genres.

    Example response:
        [
            {
                "genero_id": 1,
                "descripcion": "Fantasy"
            },
            {
                "genero_id": 2,
                "descripcion": "Science Fiction"
            }
        ]
    """
    try:
        genres = Genre.query.all()
        result = genres_schema.dump(genres)
        return jsonify(result), 200

    except ValidationError as err:
        return jsonify({'errors': err.messages}), 422
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@library_bp.route('/top_books', methods=['GET'])
@jwt_required()
def get_top_books():
    """
    Get the top 10 most popular books based on the number of relations with personal libraries.

    This endpoint allows the client to retrieve the top 10 most popular books based on the number of relations with personal libraries.

    Returns:
        JSON: A response containing the list of top 10 most popular books.

    Example response:
        [
            {
                "libro_id": 1,
                "titulo": "Book Title",
                "autores": ["Author 1", "Author 2"],
                "editorial": "Editorial Name",
                "fecha_publicacion": "2023-01-01",
                "isbn": "1234567890123",
                "numero_paginas": 300,
                "generos": ["Genre 1", "Genre 2"],
                "idioma": "Español",
                "cantidad_guardados": 10
            }
        ]
    """
    try:
        top_books = db.session.query(
            Book,
            func.count(PersonalLibrary.libro_id).label('cantidad_guardados')
        ).outerjoin(PersonalLibrary).group_by(Book.libro_id).order_by(func.count(PersonalLibrary.libro_id).desc()).limit(10).all()

        result = []
        for book, cantidad_guardados in top_books:
            result.append({
                "libro_id": book.libro_id,
                "titulo": book.titulo,
                "autores": [author.nombre for author in book.autores],
                "editorial": book.editorial,
                "fecha_publicacion": book.fecha_publicacion,
                "isbn": book.isbn,
                "numero_paginas": book.numero_paginas,
                "generos": [genre.descripcion for genre in book.generos],
                "idioma": book.idioma,
                "cantidad_guardados": cantidad_guardados
            })

        return jsonify(result), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@library_bp.route('/top_categories', methods=['GET'])
@jwt_required()
def get_top_categories():
    """
    Get the top 6 categories with the most books.

    This endpoint allows the client to retrieve the top 6 categories with the most books.

    Returns:
        JSON: A response containing the list of top 6 categories.

    Example response:
        [
            {
                "genero_id": 1,
                "descripcion": "Fantasy",
                "count": 50
            },
            {
                "genero_id": 2,
                "descripcion": "Science Fiction",
                "count": 45
            }
        ]
    """
    try:
        top_categories = db.session.query(
            Genre.genero_id,
            Genre.descripcion,
            func.count(Book.libro_id).label('count')
        ).join(Book.generos).group_by(Genre.genero_id).order_by(func.count(Book.libro_id).desc()).limit(6).all()

        result = [{"genero_id": genero_id, "descripcion": descripcion, "count": count} for genero_id, descripcion, count in top_categories]
        
        return jsonify(result), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
