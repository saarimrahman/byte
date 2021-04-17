# Contains necessary configuration and setup for testing.

import sys, os, pytest
from flask import json
sys.path.insert(1, os.path.join(sys.path[0], '..'))
from app import create_app, init_app

# Helper class containing useful functions for testing.
class ByteTestHelper:
    def __init__(self, client):   
        self.client = client  

    # converts response data into useable format i.e. dict
    def convertResponse(self, response):
        return json.loads(response.data)

    def post(self, route, json, auth_token=''):
        response = self.client.post(route, json=json, headers={'auth_token': auth_token})
        return self.convertResponse(response)

    def get(self, route, auth_token=''):
        response = self.client.get(route, headers={'auth_token': auth_token})
        return self.convertResponse(response)

    def delete(self, route, auth_token=''):
        response = self.client.delete(route, headers={'auth_token': auth_token})
        return self.convertResponse(response)

    def register(self, name, username, email, password):
        return self.post('/register', {'name': name, 'username': username, 'email': email, 'password': password})
    
    def login(self, username, password):
        response = self.post('/login', {'username': username, 'password': password})
        assert 'auth_token' in response
        self.auth_token = response['auth_token']
        return response

    def logout(self):
        return self.post('/logout', {}, self.auth_token)

    def deleteUser(self):
        return self.delete('/delete_user', self.auth_token)
    
    def follow(self, _id):
        return self.post('/user/follow', {'userToFollow': _id}, self.auth_token)

    # checks converted response for success in response key
    def _assert(self, json):
        assert 'success' in json['response'].lower()

@pytest.fixture()
def app():
    return create_app('testing')

@pytest.fixture()
def client(app):
    db = init_app(app)
    with app.app_context():
        db.create_all()
        yield app.test_client()
        # teardown
        db.session.remove()
        db.drop_all()

@pytest.fixture()
def byte(client):
    return ByteTestHelper(client)
