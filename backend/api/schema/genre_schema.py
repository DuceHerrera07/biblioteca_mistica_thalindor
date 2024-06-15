from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from api.model.genre import Genre
from api.extensions import ma

class GenreSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Genre
        load_instance = True
        sqla_session = ma.SQLAlchemySchema.session
