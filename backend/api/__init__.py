from flask import Flask, jsonify
from api.config import Config
from api.extensions import db, jwt, ma
from api.controller.auth_controller import auth_bp
from api.controller.library_controller import library_bp
from flask_cors import CORS

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app, resources={
        r"/api/*": {"origins": config_class.URL_FRONTEND},
        r"/health": {"origins": config_class.URL_FRONTEND}
    })

    # Inicializar extensiones
    db.init_app(app)
    jwt.init_app(app)
    ma.init_app(app)

    # Registrar blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(library_bp, url_prefix='/api/library')

    # Health check
    @app.route('/health')
    def health():
        return jsonify({'status': 'Healthy'}), 200

    return app
