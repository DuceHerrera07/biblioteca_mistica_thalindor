from flask import Blueprint, request, jsonify
from api.extensions import db
from api.model.book import Book
from api.model.personal_library import PersonalLibrary
from api.schema.book_schema import BookSchema
from api.schema.personal_library_schema import PersonalLibrarySchema
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError

library_bp = Blueprint('library', __name__)
book_schema = BookSchema()
books_schema = BookSchema(many=True)
personal_library_schema = PersonalLibrarySchema(many=True)

@library_bp.route('/personal_library', methods=['GET'])
@jwt_required()
def get_personal_library():
    """
    Get the personal library of the authenticated user.

    This endpoint allows the client to retrieve the list of books in the personal library of the currently authenticated user.

    Returns:
        JSON: A response containing the list of books in the personal library.

    Example response:
        [
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
    """
    try:
        current_user_id = get_jwt_identity()
        personal_library = PersonalLibrary.query.filter_by(usuario_id=current_user_id).all()

        result = personal_library_schema.dump(personal_library)
        return jsonify(result), 200

    except ValidationError as err:
        return jsonify({'errors': err.messages}), 422
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@library_bp.route('/personal_library', methods=['POST'])
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

@library_bp.route('/personal_library/<int:libro_id>', methods=['DELETE'])
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

@library_bp.route('/search_books', methods=['GET'])
@jwt_required()
def search_books():
    """
    Search for books in the system.

    This endpoint allows the client to search for books in the system and retrieve a paginated list of results.

    Returns:
        JSON: A response containing the list of books matching the search criteria.

    Example response:
        [
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
    """
    try:
        page = request.args.get('page', 1, type=int)
        books = Book.query.paginate(page=page, per_page=50)

        result = books_schema.dump(books.items)
        return jsonify(result), 200

    except ValidationError as err:
        return jsonify({'errors': err.messages}), 422
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
        return jsonify(result), 200

    except ValidationError as err:
        return jsonify({'errors': err.messages}), 422
    except Exception as e:
        return jsonify({'error': str(e)}), 500
