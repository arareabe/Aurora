from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Question
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms.question_form import QuestionForm

question_routes = Blueprint('questions', __name__)

# Read Questions

@question_routes.route('/')
def readQuestions():
  questions = Question.query.all()
  return {'questions': [question.to_dict() for question in questions]}

# Read a Question
@question_routes.route('/<int:questId>')
def readSingleQuestion(questId):
  question = Question.query.get(questId)

  return { 'question': question.to_dict() }

# Delete Single Question

@question_routes.route('/', methods=['DELETE'])
def deleteQuestion():
  data = request.json

  print('FORM DATA ------------------->', data)

  quest_id = data['questId']
  actualQuestion = Question.query.get(quest_id)

  print("ACTUAL QUEST ====================", actualQuestion)

  db.session.delete(actualQuestion)
  db.session.commit()

  return { 'response': 'Successful deletion' }

# Create Single Question

@question_routes.route('/', methods=['POST'])
@login_required
def createSingleQuestion():
  form = QuestionForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  owner_id = current_user.get_id()

  if form.validate_on_submit():
    newQuestion = Question(
      userId = form.data['userId'],
      question = form.data['question'],
      imageUrl = form.data['imageUrl']
    )

    db.session.add(newQuestion)
    db.session.commit()

    return newQuestion.to_dict()
  else:
    return { 'errors': validation_errors_to_error_messages(form.errors) }
# Update Single Question

@question_routes.route('/', methods=['PATCH'])
@login_required
def updateQuestion():
  form = QuestionForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    quest_id = form.data['question_id']
    updated_question = form.data['question']
    if (form.data['imageUrl']):

      updated_url = form.data['imageUrl']

      actualQuestion = Question.query.get(quest_id)
      actualQuestion.question = updated_question
      actualQuestion.imageUrl = updated_url

      db.session.commit()

      return actualQuestion.to_dict()

    else:
      actualQuestion = Question.query.get(quest_id)
      actualQuestion.question = updated_question

      db.session.commit()

      return actualQuestion.to_dict()

  else:
    return { 'errors': validation_errors_to_error_messages(form.errors) }
