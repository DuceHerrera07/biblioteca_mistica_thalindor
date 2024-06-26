from flask import Blueprint, request, jsonify
from api.extensions import db
from api.model.user import User
from api.schema.user_schema import UserSchema
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from marshmallow import ValidationError

auth_bp = Blueprint('auth', __name__)
user_schema = UserSchema()
user_schema_partial = UserSchema(partial=True)

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new user.

    This endpoint allows the client to register a new user by providing the required information in the JSON body.

    Returns:
        JSON: A response containing the user data if the user is registered successfully, or an error message if the email is already registered.

    Example JSON body:
        {
            "nombre": "John Doe",
            "correo_electronico": "johndoe@example.com",
            "contrasena": "password123"
        }
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Validate input data
        user_data = {
            'nombre': data.get('nombre'),
            'correo_electronico': data.get('correo_electronico'),
            'contrasena_hash': data.get('contrasena')
        }
        user_schema_partial.load(user_data)

        # Check if the email is already registered
        if User.query.filter_by(correo_electronico=user_data['correo_electronico']).first():
            return jsonify({'error': 'El correo electrónico ya está registrado'}), 400

        # Hash the password
        hashed_password = generate_password_hash(user_data['contrasena_hash'], method='pbkdf2:sha256', salt_length=8)
        
        # Create a new user instance
        new_user = User(
            nombre=user_data['nombre'],
            correo_electronico=user_data['correo_electronico'],
            contrasena_hash=hashed_password
        )
        
        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Usuario registrado exitosamente'}), 201
    
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 422
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Authenticates a user by checking their credentials and returning an access token.

    This endpoint allows the client to log in by providing their email and password in the JSON body.

    Returns:
        JSON: A response containing an access token if the credentials are valid.
        Otherwise, returns a JSON response with an error message and a status code of 401.

    Example JSON body:
        {
            "correo_electronico": "johndoe@example.com",
            "contrasena": "password123"
        }
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Validate input data
        login_data = {
            'correo_electronico': data.get('correo_electronico'),
            'contrasena_hash': data.get('contrasena')
        }
        user_schema_partial.load(login_data)

        # Find the user by email
        user = User.query.filter_by(correo_electronico=login_data['correo_electronico']).first()
        
        # Check if the user exists and if the password is correct
        if not user or not check_password_hash(user.contrasena_hash, login_data['contrasena_hash']):
            return jsonify({'error': 'Credenciales inválidas'}), 401

        # Create an access token
        access_token = create_access_token(identity=user.usuario_id, fresh=True, expires_delta=False)    
        
        return jsonify({'access_token': access_token}), 200
    
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 422
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    """
    Get the profile of the authenticated user.

    This endpoint allows the client to retrieve the profile information of the currently authenticated user.

    Returns:
        JSON: A response containing the user's profile information.

    Example response:
        {
            "nombre": "John Doe",
            "correo_electronico": "johndoe@example.com"
        }
    """
    try:
        # Get the current user's ID from the JWT
        current_user_id = get_jwt_identity()
        
        # Retrieve the user from the database
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404
        
        return user_schema.jsonify(user), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
