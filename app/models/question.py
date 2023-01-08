from .db import db, add_prefix_for_prod, environment, SCHEMA
from sqlalchemy import DateTime
from sqlalchemy.sql.functions import now

class Question(db.Model):
  __tablename__ = 'questions'

  if environment == "production":
    table_args = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  question = db.Column(db.String(260), nullable=False)
  #Space Name?
  userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  imageUrl = db.Column(db.String(1000))
  createdAt = db.Column(DateTime(timezone=True), server_default=now())
  updatedAt = db.Column(DateTime(timezone=True), onupdate=now())

  user = db.relationship('User', back_populates='questions')
  answers = db.relationship('Answer', back_populates='question', cascade='all, delete-orphan', primaryjoin='Question.id == Answer.questionId')

  def to_dict(self):
    return {
      'id': self.id,
      'question': self.question,
      'user': self.user.to_dict(),
      'userId': self.userId,
      'imageUrl': self.imageUrl,
      'createdAt': self.createdAt,
      'answers': [answer.to_dict() for answer in self.answers]
    }
