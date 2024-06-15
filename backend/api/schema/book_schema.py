from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from api.model.book import Book
from api.schema.author_schema import AuthorSchema
from api.schema.genre_schema import GenreSchema
from api.extensions import ma
from marshmallow import fields

class BookSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        include_relationships = True
        load_instance = True
        sqla_session = ma.SQLAlchemySchema.session
    
    # Custom fields to serialize as lists of strings
    autores = fields.Method("get_author_names")
    generos = fields.Method("get_genre_descriptions")
    
    def get_author_names(self, obj):
        return [author.nombre for author in obj.autores]
    
    def get_genre_descriptions(self, obj):
        return [genre.descripcion for genre in obj.generos]