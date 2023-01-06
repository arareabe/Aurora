from app.models import db, Question

def seed_questions():
  questions = [
    Question(userId='1', question="Which was Douglas Adams' single best line of writing?", imageUrl='https://i.imgur.com/Csp6tZk.png'),
    Question(userId='2', question='How does an elevator calculate floors? How did people know that such technology existed before it was invented?', imageUrl='https://i.imgur.com/0FEd3uM.png'),
    Question(userId='3', question='Is there such thing as "Lost Technology," or is that a myth?', imageUrl='https://i.imgur.com/miEJ6Ib.png'),
    Question(userId='4', question='What is the saddest moment you have seen in a movie or TV?'),
    Question(userId='1', question="Why didn't they use an actual Kazakh language in Borat movie, it sounded more like a mixture of Russian and Polish instead of Kazakh?"),
    Question(userId='2', question='Was it true that Grigori Rasputin, the Siberian monk, had great influence over Tsarina Alexandra and her husband Tsar Nicholas II?'),
    Question(userId='3', question='Can you think of something that has lasted for centuries, but no one knows why it was created in the first place?', imageUrl='https://i.imgur.com/XPBGpey.png'),
    Question(userId='4', question="What is the craziest thing you've had to do as a business owner to get someone to pay a bill?")
  ]

  for question in questions:
    db.session.add(question)

  db.session.commit()

def undo_questions():
    db.session.execute('TRUNCATE questions RESTART IDENTITY CASCADE;')
    db.session.commit()
