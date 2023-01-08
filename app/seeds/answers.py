from app.models import db, Answer, environment, SCHEMA

def seed_answers():
    answers = [
        Answer(userId = 2, questionId = 1, answer = """I've always liked “The story so far: In the beginning, the universe was created. This has made a lot of people unhappy and has widely been regarded as a bad move.""" ),
        Answer(userId = 3, questionId = 2, answer = "It's just a cage held by a crane."),
        Answer(userId = 4, questionId = 3, answer = "Almost everything that is considered a 'Lost Technology' is something that modern humans have been able to surpass at this point via other means. It's just not in human nature to stand still and not create solutions to problems."),
        Answer(userId = 1, questionId = 4, answer = 'This man, Joe Irvine, stepped onto the stage and sang “Cry Me A River”. He sang well enough, nothing seemed to be wrong. But when he was done, two of the judges ploughed into him, they completely laid into him.'),
        Answer(userId = 2, questionId = 5, answer = 'Because the whole point of the movie it that nobody in the West knows anything about Kazakhstan.'),
        Answer(userId = 3, questionId = 6, answer = "He wasn't a monk, and his influence on the Empress was limited. Rasputin's influence on the Emperor was negligible."),
        Answer(userId = 4, questionId = 7, answer = 'The first thing that comes to mind is the pyramids. Supposedly they were tombs, but no burials were actually found in them.'),
        Answer(userId = 1, questionId = 8, answer = "I want the owner, but worked directly for her. I was brought back to the home office as general fixer. That is, I was given jobs that weren't getting done. Among them was collecting long past due debts. It was an agriculture company, so we dealt mostly with farmers and farm supply businesses."),
        Answer(userId = 3, questionId = 1, answer = '“To boldly split infinitives that had never been split before”.'),
        Answer(userId = 4, questionId = 2, answer = 'People have been exposed to this technology since they started pulling buckets out of wells, and probably before that.'),
        Answer(userId = 1, questionId = 3, answer = 'No such thing as lost technology, only lost methods.'),
        Answer(userId = 2, questionId = 4, answer = 'The death of Robb Stark at the Red Wedding! The Young Wolf avenged him tho :)'),
        Answer(userId = 3, questionId = 5, answer = "It's just a ploy to make Westerners dealing with Borat look stupid or ridiculous. The Kazakh scenes were shot in Romania, nowhere near Kazakhstan in more ways than one."),
        Answer(userId = 4, questionId = 6, answer = 'Empress Alexandra held him in high regard and listened to some of his political and spiritual musings. Emperor Nicholas, on the other hand, had no interest in Rasputin, and he put up with him solely because of young Alexei.'),
        Answer(userId = 1, questionId = 7, answer = 'Stonehenge. Guess all they want, nobody knows why that was built/arranged'),
        Answer(userId = 2, questionId = 8, answer = "One particular farmer was well over a year in arrears. Several people had tried to collect from him, but he was never home when they showed up, and he didn't answer his phone."),
    ]

    for answer in answers:
        db.session.add(answer)

    db.session.commit()

def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM answers")

    db.session.commit()
