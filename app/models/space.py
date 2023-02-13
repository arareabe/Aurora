from .db import db, add_prefix_for_prod, environment, SCHEMA
from sqlalchemy import DateTime
from sqlalchemy.sql.functions import now

class Space(db.Model):
  __tablename__ = 'spaces'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  space = db.Column(db.String(260), nullable=False)
  imageUrl = db.Column(db.String(1000), nullable=False)
  createdAt = db.Column(DateTime(timezone=True), server_default=now())

  questions = db.relationship('Question', back_populates='space', cascade='all, delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'space': self.space,
      'imageUrl': self.imageUrl,
      'createdAt': self.createdAt,
      'questions': [question.to_dict() for question in self.questions]
    }
