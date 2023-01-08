from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def really_email(form, field):
    email = form.data['email']
    if '@' not in email:
        raise ValidationError('Input a valid email address')

def password_same(form, field):
    password = form.data['password']
    repeatPassword = form.data['repeatPassword']

    print("pass===============", password)
    print('rep=============', repeatPassword)
    if password != repeatPassword:
        raise ValidationError('Passwords must match')


class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[DataRequired('Please enter your first name')])
    lastName = StringField('lastName', validators=[DataRequired('Please enter your last name')])
    username = StringField(
        'username', validators=[DataRequired('Please enter your username'), username_exists])
    email = StringField('email', validators=[DataRequired('Please enter your email'), really_email, user_exists])
    password = StringField('password', validators=[DataRequired('Please enter your password'), password_same])
    repeatPassword = StringField('repeatPassword', validators=[DataRequired('Please enter your password')])
    description = StringField('description', validators=[DataRequired('Please enter a description')])
