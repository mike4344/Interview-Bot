from flask import Blueprint, jsonify, request
from app.models import Question

questions_routes = Blueprint('questions', __name__)


@questions_routes.route('/<question_id>', methods=['GET'])
def questions_handler(question_id):
    if request.method == 'GET':
        question_query = Question.query.filter(Question.id == question_id).first()
        questions = question_query.to_dict()
        return {'questions': questions}
