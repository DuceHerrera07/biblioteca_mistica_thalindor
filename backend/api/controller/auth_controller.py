from flask import Blueprint, request, jsonify
from api.extensions import db
from api.model.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new user.

    This endpoint allows the client to register a new user by providing the required information in the JSON body.

    Returns:
        A JSON response containing a success message if the user is registered successfully, or an error message if the email is already registered.

    Example JSON body:
        {
            "nombre": "John Doe",
            "correo_electronico": "johndoe@example.com",
            "contrasena": "password123"
        }
    """
    data = request.get_json()
    if User.query.filter_by(correo_electronico=data['correo_electronico']).first():
        return jsonify({'message': 'El correo electrónico ya está registrado'}), 400
    
    hashed_password = generate_password_hash(data['contrasena'], method='pbkdf2:sha256', salt_length=8)
    new_user = User(
        nombre=data['nombre'],
        correo_electronico=data['correo_electronico'],
        contrasena_hash=hashed_password
    )
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'Usuario registrado exitosamente'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Authenticates a user by checking their credentials and returning an access token.

    Returns:
        A JSON response containing an access token if the credentials are valid.
        Otherwise, returns a JSON response with an error message and a status code of 401.
    """
    data = request.get_json()
    user = User.query.filter_by(correo_electronico=data['correo_electronico']).first()
    if not user or not check_password_hash(user.contrasena_hash, data['contrasena']):
        return jsonify({'message': 'Credenciales inválidas'}), 401
    
    access_token = create_access_token(identity=user.usuario_id)
    return jsonify({'access_token': access_token}), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({
        'nombre': user.nombre,
        'correo_electronico': user.correo_electronico
    }), 200
