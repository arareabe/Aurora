from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Answer, Question
from app.forms.answer_form import AnswerForm
from app.api.auth_routes import validation_errors_to_error_messages

answer_routes = Blueprint('answers', __name__)

# Read all answers

@answer_routes.route('/<int:questionId>/answers')
@login_required
def readAnswers(questionId):
    answers = Answer.query.filter(Answer.questionId == questionId).all()
    return { 'answers': [answer.to_dict() for answer in answers]}

# Create Single Answer

@answer_routes.route('/', methods=['POST'])
@login_required
def createSingleAnswer():
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    user_id = current_user.get_id()


    if form.validate_on_submit():
        newAnswer = Answer(
            userId = form.data['userId'],
            questionId = form.data['questionId'],
            answer = form.data['answer']
        )

        db.session.add(newAnswer)
        db.session.commit()

        return newAnswer.to_dict()
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


# Update Single Answer

@answer_routes.route('/', methods=['PATCH'])
@login_required
def update_answer():
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']



    if form.validate_on_submit():
        print("FORM DATA ----------------", form.data)

        answer_id = form.data['answer_id']
        edited_answer = form.data['answer']

        answer = Answer.query.get(answer_id)
        print("ANSWEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", answer)
        answer.answer = edited_answer

        db.session.commit()

        return answer.to_dict()

    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 402

# Delete Single Answer

@answer_routes.route('/', methods=['DELETE'])
def delete_answer():
    data = request.json

    answer_id = data['answer_id']
    answer = Answer.query.get(answer_id)

    db.session.delete(answer)
    db.session.commit()

    return { 'Response': 'Succesful deletion.' }
