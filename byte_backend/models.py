from app import db, SECRET_KEY
import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

# association table for managing followed / following
followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'))
)

class User(db.Model):
    # user id
    id = db.Column(db.Integer, primary_key=True)
    
    # basic user information
    name = db.Column(db.String(80))
    username = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    gender = db.Column(db.String(10), nullable=True)
    birth_date = db.Column(db.DateTime, nullable=True)
    profile_pictures = db.relationship('Image', backref='prof_pic_of')
    member_since = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    bio = db.Column(db.Unicode(256))
    posts = db.relationship('Post', backref='poster')

    # boolean if user is admin or not
    admin = db.Column(db.Boolean, default=False)
    # authentication token for their login session 
    auth_token = db.Column(db.Unicode(512), nullable=True)

	# The user's followed and follow / unfollow functions
    # list of followed users (i.e those on the right side; who this user is following)
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0
    
    def get_reset_token(self, expires_sec=600):
        s = Serializer(SECRET_KEY, expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)

class Post(db.Model):
    # post id
    id = db.Column(db.Integer, primary_key=True)

    # TODO post information
    # product = db.relationship('Product', backref='product_of_post')
    # user = db.relationship('User', backref='user_of_post')
    price = db.Column(db.Float, nullable=False)
    caption = db.Column(db.Unicode(256))
    comments = db.Column(db.Unicode(256))
    likes = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Image(db.Model):
    # Image id of the image table #
    id = db.Column(db.Integer, primary_key=True)

    # public id of the image in cloudinary 
    cloud_id = db.Column(db.Unicode(512))

    # The link to this picture in the cloud server #
    cloud_link = db.Column(db.Unicode(512))

    # If this image is a profile picture... #
    profile_id = db.Column(db.Integer, db.ForeignKey('user.id'))