#  Tests for all routes related to users.

def test_editProfile(byte):
    byte._assert(byte.register('John', 'john', 'john@gmail.com', 'secret'))
    byte._assert(byte.login('john', 'secret'))
    response = byte.post('/user/edit_profile', {'name': 'John', 'username': 'john', 'email': 'john@gmail.com', 'gender': 'Male', 'birthdate': 'January 1, 2020'}, byte.auth_token)
    byte._assert(response)

def test_forgotPassword(byte):
    pass

def test_follow(byte):
    byte._assert(byte.register('John', 'john', 'john@gmail.com', 'secret'))
    byte._assert(byte.register('Kevin', 'kev', 'kev@gmail.com', 'secret'))
    byte._assert(byte.login('john', 'secret'))
    # John follows Kevin who has userId 2
    byte._assert(byte.follow(2))

def test_getFollowed(byte):
    byte._assert(byte.register('John', 'john', 'john@gmail.com', 'secret'))
    byte._assert(byte.register('Kevin', 'kev', 'kev@gmail.com', 'secret'))
    byte._assert(byte.login('john', 'secret'))
    # John follows Kevin who has userId 2
    byte._assert(byte.follow(2))
    byte._assert(byte.get('/user/followed', byte.auth_token))

def test_getFollowers(byte):
    byte._assert(byte.register('John', 'john', 'john@gmail.com', 'secret'))
    byte._assert(byte.register('Kevin', 'kev', 'kev@gmail.com', 'secret'))
    byte._assert(byte.login('john', 'secret'))
    # John follows Kevin who has userId 2
    byte._assert(byte.follow(2))
    byte._assert(byte.get('/user/followers', byte.auth_token))

def test_unfollow(byte):
    byte._assert(byte.register('John', 'john', 'john@gmail.com', 'secret'))
    byte._assert(byte.register('Kevin', 'kev', 'kev@gmail.com', 'secret'))
    byte._assert(byte.login('john', 'secret'))
    # John follows Kevin who has userId 2
    byte._assert(byte.post('/user/follow', {'userToFollow': 2}, byte.auth_token))
    # John unfollows Kevin who has userId 2
    byte._assert(byte.post('/user/unfollow', {'userToUnfollow': 2}, byte.auth_token))
