from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError, URL
from ..models import Question

def question_short(form, field):
  question = field.data

  if len(question) < 10:
    raise ValidationError('Your question must be at least 10 characters long. Please elaborate further!')

def question_long(form, field):
  question = field.data

  if len(question) > 340:
    raise ValidationError('Your question exceeds the character limit. Please shorten your question for viewers to read.')

class QuestionForm(FlaskForm):
  userId = IntegerField('userId', validators=[DataRequired('Log in before you post a question.')])
  question = StringField('question', validators=[
    DataRequired(),
    question_short,
    question_long
  ])
  imageUrl = StringField('imageUrl')
