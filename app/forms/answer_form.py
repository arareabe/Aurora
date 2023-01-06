from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,  ValidationError
from app.models import Answer

def answer_short(form, field):
    answer = field.data

    if len(answer) < 10:
        raise ValidationError('Your answer must be at least 10 characters long.')

def answer_long(form, field):
    answer = field.data

    if len(answer) > 3000:
        raise ValidationError('Your answer cannot exceed 3000 characters long.')

class AnswerForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired('Log in before you post an answer')])
    questionId = IntegerField('questionId', validators=[DataRequired('Must select a question to answer')])
    answer_id = IntegerField('answer_id')
    answer = StringField('answer', validators=[
        DataRequired(),
        answer_short,
        answer_long
    ])
