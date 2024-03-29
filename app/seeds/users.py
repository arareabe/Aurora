from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='Demo', lastName='Man', username='demoman', email='demo@aa.io', password='password', description='Built over a thousand internationally renowned yogurt factories.', avatar='https://i.imgur.com/Iur6NJh.png')
    marnie = User(
        firstName='Marnie', lastName='Lucas', username='marnie', email='marnie@aa.io', password='password', description='Traveled to Toledo for two years.', avatar='https://i.imgur.com/Ca1yCpB.png')
    bobbie = User(
        firstName='Bobbie', lastName='Boot', username='bobbie', email='bobbie@aa.io', password='password', description='Editor-in-Chief, Reporter (2003-present)', avatar='https://i.imgur.com/azeO6hB.png')
    caesar = User(
        firstName='Edward', lastName='Sallow', username='legion', email='notncr@gmail.com', password='lucky', description='Named after a salad :)', avatar='https://i.imgur.com/P66DeqF.png')
    joshua = User(
        firstName='Joshua', lastName='Graham', username='burningman', email='exlegion@yahoo.com', password='touche', description='Once led a contingent of pioneers, also but a common man', avatar='https://i.imgur.com/g7FpfCA.png')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(caesar)
    db.session.add(joshua)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
