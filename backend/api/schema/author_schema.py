from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from api.model.author import Author
from api.extensions import ma

class AuthorSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Author
        load_instance = True
        sqla_session = ma.SQLAlchemySchema.session
