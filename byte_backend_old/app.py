from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_mail import Mail
from os import path


is_production = False
db = SQLAlchemy()
mail = Mail()
SECRET_KEY = os.urandom(24)

def create_app(target):
    app = Flask(__name__)
    app.config.update(
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        SECRET_KEY=SECRET_KEY,
        # MAIL_SERVER='smtp.gmail.com',
        # MAIL_PORT=587,
        # MAIL_USE_TLS=True,
        # MAIL_USERNAME = 'actadevservices@gmail.com',
        # MAIL_PASSWORD = 'waterbottle1'
    )

    if target == 'testing':
        basedir = path.abspath(path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + path.join(basedir, 'shop.sqlite')
    if target == 'production':
        app.config['SQLALCHEMY_DATABASE_URI'] = 'todo'
    
    return app

from routes import configure_routes

def init_app(_app):
    db.init_app(_app)
    mail.init_app(_app)
    configure_routes(_app)
    return db
