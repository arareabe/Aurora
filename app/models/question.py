from .db import db
from sqlalchemy import DateTime
from sqlalchemy.sql.functions import now

class Question(db.Model):
  __tablename__ = 'questions'

  id = db.Column(db.Integer, primary_key=True)
  question = db.Column(db.String(260), nullable=False)
  #Space Name?
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  createdAt = db.Column(DateTime(timezone=True), server_default=now())
  updatedAt = db.Column(DateTime(timezone=True), onupdate=now())

  user = db.relationship('User', back_populates='questions')
  answers = db.relationship('Answer', back_populates='question', cascade='all, delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'question': self.question,
      'user': self.user.to_dict(),
      'userId': self.userId,
      'createdAt': self.createdAt,
      'answers': [answer.to_dict() for answer in self.answers]
    }
