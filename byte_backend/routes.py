from flask import request, jsonify, redirect, url_for, render_template, flash
from app import db, is_production, mail
from models import User, Image, Post
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
from functools import wraps
from flask_mail import Message

ADMIN_EMAIL = ''

def configure_routes(app):
#######################################################################################
# # #                      Authentication & Security Routes                       # # #
#######################################################################################

    # User authentication method #
    def authenticate_user(func):
        @wraps(func)
        def wrapper(*args, **kwargs):

            # Get the authentication token #
            # auth token is generated every time someone logs in. see login route
            try:
                auth_token = request.headers['auth_token']
            except KeyError:
                return jsonify({"error": "Improper request. Please send an auth_token in" + \
                    " the header"})
            except TypeError:
                return jsonify({"error": "The input was not provided properly"})


            user = User.query.filter_by(auth_token=auth_token).first()
            if user is None:
                return jsonify({'error': 'NO_SESSION'})

            return func(user, *args, **kwargs)

        return wrapper

    # Vendor authentication method #
    def authenticate_vendor(func):
        @wraps(func)
        def wrapper(*args, **kwargs):

            # Get the authentication token #
            # auth token is generated every time someone logs in. see login route
            try:
                auth_token = request.headers['auth_token']
            except KeyError:
                return jsonify({"error": "Improper request. Please send an auth_token in" + \
                    " the header"})
            except TypeError:
                return jsonify({"error": "The input was not provided properly"})


            vendor = Vendor.query.filter_by(auth_token=auth_token).first()
            if vendor is None:
                return jsonify({'error': 'NO_SESSION'})

            return func(vendor, *args, **kwargs)

        return wrapper
#######################################################################################
# # #                            Home & Error Routes                              # # #
#######################################################################################

    # Home route
    @app.route('/')
    def home():
        return "Welcome to Acta"


    # 404 Not Found
    @app.errorhandler(404)
    def page_not_found(e):
        return "Oops! The page you were looking for was not found."


    # 500 Internal Server Error
    @app.errorhandler(500)
    def internal_error(e):
        return "Oops! Something went wrong."


#######################################################################################
# # #                         Login & Authentication Routes                       # # #
#######################################################################################

    # Process register request for user
    @app.route('/register', methods=['POST'])
    def registerUser():
        try:            
            name = request.json['name']
            username = request.json['username']
            email = request.json['email']
            password = request.json['password']
        except KeyError:
            return jsonify({"error": "Improper request. Please send name, email, username, and password"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})

        hashed_password = generate_password_hash(password=password, salt_length=16)
        new_user = User(name=name, username=username, password=hashed_password, email=email)

        # Add the user to the database
        try:
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)})

        return jsonify({"response": "Success! User successfully added."})

    # Process register request for vendor
    @app.route('/vendor/register', methods=['POST'])
    def registerVendor():
        try:            
            name = request.json['name']
            location = request.json['location']
            bio = request.json['bio']
            email = request.json['email']
            password = request.json['password']
            website = request.json['website']
            industry = request.json['industry']
        except KeyError:
            return jsonify({"error": "Improper request. Please send name, location, bio, email, password, website, industry"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})

        hashed_password = generate_password_hash(password=password, salt_length=16)
        new_vendor = Vendor(name=name, location=location, password=hashed_password, email=email, bio=bio, website=website, industry=industry)

        # Add the vendor to the database
        try:
            db.session.add(new_vendor)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)})

        return jsonify({"response": "Success! Vendor successfully added."})

    # Process login request
    @app.route('/login', methods=['POST'])
    def loginUser():
        try:
            username = request.json['username']
            password = request.json['password']
        except KeyError:
            return jsonify({"error": "Improper request. Please send username and password"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})

        user = User.query.filter_by(username=username).first()

        if not user or not check_password_hash(user.password, password):
            return jsonify({"error": "Email or password is incorrect, please try again."})

        user.auth_token = secrets.token_urlsafe(512)

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)})        

        return jsonify({
            'response': 'Successful log in.',
            'auth_token': user.auth_token,
            'email': user.email,
            'name': user.name,
            'username': user.username,
            'user_id': user.id,
            'gender': user.gender
        })

    # Process vendor login request
    @app.route('/vendor/login', methods=['POST'])
    def loginVendor():
        try:
            email = request.json['email']
            password = request.json['password']
        except KeyError:
            return jsonify({"error": "Improper request. Please send email and password"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})

        vendor = Vendor.query.filter_by(email=email).first()

        if not vendor or not check_password_hash(vendor.password, password):
            return jsonify({"error": "Email or password is incorrect, please try again."})

        vendor.auth_token = secrets.token_urlsafe(512)

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)})        

        return jsonify({
            'response': 'Successful log in.',
            'auth_token': vendor.auth_token,
        })

    # Process logout request
    @app.route('/logout', methods=['POST'])
    @authenticate_user
    def logoutUser(user):
        user.auth_token = None

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)})        

        return jsonify({'response': 'Successfully logged out'})

    # Process logout request
    @app.route('/vendor/logout', methods=['POST'])
    @authenticate_vendor
    def logoutVendor(vendor):
        vendor.auth_token = None

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)})        

        return jsonify({'response': 'Successfully logged out vendor'})

    # Deletes a user based on their user id
    @app.route("/delete_user", methods = ["DELETE"])
    @authenticate_user
    def delete_user(user):
        if user is None:
            return jsonify({"response": "No such user exists"})

        try:
            # Delete the user
            db.session.delete(user)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)})        

        return jsonify({"response": "Success! User deleted."})

    #######################################################################################
    # # #                         Updating User Profile Routes                       # # #
    #######################################################################################


    def send_reset_email(user):
        token = user.get_reset_token()
        msg = Message('Password Reset Request',
                    sender=ADMIN_EMAIL,
                    recipients=[user.email])
        msg.body = f'''To reset your password, visit the following link:
        {url_for('reset_password', token=token, _external=True)}
        If you did not make this request then simply ignore this email and no changes will be made.
        '''
        mail.send(msg)


    @app.route('/forgot_password', methods=['GET', 'POST'])
    def forgot_password():
        try:
            email = request.json['email']
        except KeyError:
            return jsonify({"error": "Improper request. Please send email"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})

        user = User.query.filter_by(email=email).first()
        if user is None:
            return jsonify({'error': 'invalid email'})
        send_reset_email(user)
        return jsonify({'response': 'Success. An email has been sent with instructions to reset your password.'})


    @app.route('/reset_password/<token>', methods=['GET', 'POST'])
    def reset_password(token):
        try:
            password = request.json['password']
        except KeyError:
            return jsonify({"error": "Improper request. Please send password"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})

        user = User.verify_reset_token(token)
        if user is None:
            return jsonify({"error": "This token has expired."})
        hashed_password = generate_password_hash(password=password, salt_length=16)
        user.password = hashed_password

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)})        
        return jsonify({"response": 'Success. Your password has been updated! You are now able to log in'})


    # Edits user profile
    @app.route("/user/edit_profile", methods = ["POST"])
    @authenticate_user
    def edit_user_profile(user):
        try:
            user.name, user.gender, user.birthdate, user.username, user.email = request.json['name'], request.json['gender'], request.json['birthdate'], request.json['username'], request.json['email']
        except KeyError:
            return jsonify({"error": "Improper request. Please send name, gender, birthdate, email, and username"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})
        except Exception:
            return jsonify({'error': "Something unexpected happened!"})
        
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)})
        return jsonify({"response": "Success! User profile edited."})

    # Favorite a vendor
    @app.route("/user/favorite", methods = ["POST"])
    @authenticate_user
    def favorite(user):
        try:
            vendorToFavorite = request.json['vendorToFavorite']
        except KeyError:
            return jsonify({"error": "Improper request. Please send vendorToFavorite"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})
        
        vendorToFavorite = Vendor.query.filter_by(id=vendorToFavorite).first()
        user.favorite(vendorToFavorite)

        favorited_vendors = []
        for vendor in user.favorited_vendors:
            favorited_vendors.append(vendor.name)
        
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)})
        return jsonify({
            "response": "Success! Vendor favorited.",
            "favorited_vendors": favorited_vendors
        })

    # Unfollow a user
    @app.route("/user/unfavorite", methods = ["POST"])
    @authenticate_user
    def unfavorite(user):
        try:
            vendorToUnfavorite = request.json['vendorToUnfavorite']
        except KeyError:
            return jsonify({"error": "Improper request. Please send vendorToUnfavorite"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})
        
        vendorToUnfavorite = Vendor.query.filter_by(id=vendorToUnfavorite).first()
        user.unfavorite(vendorToUnfavorite)

        favorited_vendors = []
        for vendor in user.favorited_vendors:
            favorited_vendors.append(vendor.name)

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)})
        return jsonify({
            "response": "Success! Vendor unfavorited.",
            "favorited_vendors": favorited_vendors
        })

    # Follow another user
    @app.route("/user/follow", methods = ["POST"])
    @authenticate_user
    def follow(user):
        try:
            userToFollow = request.json['userToFollow']
        except KeyError:
            return jsonify({"error": "Improper request. Please send userToFollow"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})
        
        userToFollow = User.query.filter_by(id=userToFollow).first()
        user.follow(userToFollow)

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)})
        return jsonify({"response": "Success! User followed."})

    # Unfollow a user
    @app.route("/user/unfollow", methods = ["POST"])
    @authenticate_user
    def unfollow(user):
        try:
            userToUnfollow = request.json['userToUnfollow']
        except KeyError:
            return jsonify({"error": "Improper request. Please send userToFollow"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})
        
        userToUnfollow = User.query.filter_by(id=userToUnfollow).first()
        user.unfollow(userToUnfollow)

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)})
        return jsonify({"response": "Success! User unfollowed."})

    # Get all users who this user follows
    @app.route("/user/followed", methods = ["GET"])
    @authenticate_user
    def getFollowed(user):
        followedUsers = []
        for followed in user.followed:
            followedUsers.append({
                'id': followed.id,
                'name': followed.name
            })
        
        return jsonify({
            "response": "Success! Fetched user's followed",
            'followedUsers': followedUsers
        }) 
    
    # Get all users who follow this user
    @app.route("/user/followers", methods = ["GET"])
    @authenticate_user
    def getFollowers(user):
        followers = []
        for follower in user.followers:
            followers.append({
                'id': follower.id,
                'name': follower.name
            })

        return jsonify({
            'followers': followers,
            "response": "Success! Fetched user's following"
        })



    #######################################################################################
    # # #                         Vendor Methods                                      # # #
    #######################################################################################

    # Get all users who favorited this vendor
    @app.route("/vendor/favoritors", methods = ["GET"])
    @authenticate_vendor
    def getFavoritors(vendor):
        favoritors = []
        for favoritor in vendor.favorited_by:
            favoritors.append({
                'id': favoritor.id,
                'name': favoritor.name
            })
        
        return jsonify({
            "response": "Success! Fetched vendor's favoritors",
            'favoritors': favoritors
        }) 

    @app.route("/vendor/list_product", methods = ["POST"])
    @authenticate_vendor
    def listProduct(vendor):
        try:
            # TODO: figure out posts / pictures
            name = request.json['name']
            price = request.json['price']
            description = request.json['description']
            discount = request.json['discount']
            quantity = request.json['quantity']
            # product_pictures = request.json['product_pictures']
            category = request.json['category']
            tags = request.json['tags']

        except KeyError:
            return jsonify({"error": "Improper request. Please send name, price, description, discount, quantity, product_pictures, category, tags"})
        except TypeError:
            return jsonify({"error": "The input was not provided properly"})
        
        product = Product(name=name, price=price, description=description, discount=discount, quantity=quantity, category=category, tags=tags)
        # vendor.list_product(product)

        # Add product to the database
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)})

        return jsonify({
            "response": "Success! Product successfully listed.",
            # "name": product.name,
            # "price": product.price
        })

    # Get all products listed by this vendor
    @app.route("/vendor/get_products", methods = ["GET"])
    @authenticate_vendor
    def getProducts(vendor):
        products = []
        for product in vendor.products:
            print('hit')
            products.append({
                'id': product.id,
                'name': product.name
            })
        
        return jsonify({
            "response": "Success! Fetched vendor's products",
            'products': products
        }) 