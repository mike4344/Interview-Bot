from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
fake = Faker()
# Adds a demo user, you can add other users here if you want
def seed_users():
    def auto_seed(count):
        for i in range(count):
            username = fake.name()
            email = fake.email()
            password = 'password'
            profile_picture = fake.image_url(width=80, height=80)
            while profile_picture == "https://dummyimage.com/80x80" or profile_picture == "https://www.lorempixel.com/80x80" or profile_picture =="https://www.lorempixel.com/80/80":
                profile_picture = fake.image_url(width=80, height=80)

            seed_user = User(username=username, email=email, password=password, profile_picture=profile_picture)

            db.session.add(seed_user)
    demo = User(username='Demo', email='demo@aa.io',
                password='password', profile_picture='')

    db.session.add(demo)
    auto_seed(30)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()