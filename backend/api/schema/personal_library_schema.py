from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from api.model.personal_library import PersonalLibrary
from api.schema.book_schema import BookSchema
from api.extensions import ma

class PersonalLibrarySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = PersonalLibrary
        load_instance = True
        sqla_session = ma.SQLAlchemySchema.session

    libro = BookSchema()
