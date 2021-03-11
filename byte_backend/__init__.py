from app import create_app, init_app

# Starts the database

if __name__ == '__main__':
    initial_setup = True
    app = create_app('testing')
    db = init_app(app)
    if initial_setup:
        with app.app_context():
            db.drop_all()
            db.create_all()
    app.run()

