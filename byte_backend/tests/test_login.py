#  Tests for all routes related to login and register.

from flask import json
# from conftest import register
import pytest

def test_register(byte):
    byte._assert(byte.register('John', 'john', 'john@gmail.com', 'secret'))

def test_login(byte):
    byte._assert(byte.register('John', 'john', 'john@gmail.com', 'secret'))
    byte._assert(byte.login('john', 'secret'))
    
def test_logout(byte):
    byte._assert(byte.register('John', 'john', 'john@gmail.com', 'secret'))
    byte._assert(byte.login('john', 'secret'))
    byte._assert(byte.logout())

def test_deleteUser(byte):
    byte._assert(byte.register('John', 'john', 'john@gmail.com', 'secret'))
    byte._assert(byte.login('john', 'secret'))
    byte._assert(byte.deleteUser())
