from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from api.model.user import User
from api.schema.personal_library_schema import PersonalLibrarySchema
from api.extensions import ma

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        sqla_session = ma.SQLAlchemySchema.session
    
    biblioteca_personal = PersonalLibrarySchema(many=True)
