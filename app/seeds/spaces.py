from app.models import db, Space, environment, SCHEMA

def seed_spaces():
  spaces = [
    Space(space='History', imageUrl='https://i.imgur.com/sjkHh1J.png'),
    Space(space='Books', imageUrl='https://i.imgur.com/QABeA5R.png'),
    Space(space='Technology', imageUrl='https://i.imgur.com/MYFBFVa.png'),
    Space(space='Movies', imageUrl='https://i.imgur.com/rNBphAs.png'),
    Space(space='Business', imageUrl='https://i.imgur.com/XrUqYVT.png')
  ]

  for space in spaces:
    db.session.add(space)

  db.session.commit()

def undo_spaces():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.spaces RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM spaces")

  db.session.commit()
