from .db import db, add_prefix_for_prod, environment, SCHEMA
from sqlalchemy import DateTime
from sqlalchemy.sql.functions import now

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        table_args = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(3000), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    questionId= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    createdAt = db.Column(DateTime(timezone=True), server_default=now())
    updatedAt = db.Column(DateTime(timezone=True), onupdate=now())

    user = db.relationship('User', back_populates='answers')
    question = db.relationship('Question', back_populates='answers')

    def to_dict(self):
        return {
            'id': self.id,
            'answer': self.answer,
            'questionId': self.questionId,
            'user': self.user.to_dict(),
            'userId': self.userId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
