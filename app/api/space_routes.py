from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Space, Question
from app.api.auth_routes import validation_errors_to_error_messages

space_routes = Blueprint('spaces', __name__)

# Read Spaces

@space_routes.route('/')
def readSpaces():
  spaces = Space.query.all()
  return {'spaces': [space.to_dict() for space in spaces]}

# Read Space Questions

@space_routes.route('/<int:spaceId>/questions')
@login_required
def readSpaceQuestions(spaceId):
  questions = Question.query.filter(Question.spaceId == spaceId).all()
  return { 'spaceQuestions': [question.to_dict() for question in questions] }
