from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from api.model.book import Book
from api.schema.author_schema import AuthorSchema
from api.schema.genre_schema import GenreSchema
from api.extensions import ma

class BookSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        load_instance = True
        sqla_session = ma.SQLAlchemySchema.session

    autores = AuthorSchema(many=True)
    generos = GenreSchema(many=True)
