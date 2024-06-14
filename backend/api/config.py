import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    URL_FRONTEND = os.getenv('URL_FRONTEND')