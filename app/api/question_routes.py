from flask import Blueprint, jsonify, request
from app.models import Question
import random
questions_routes = Blueprint('questions', __name__)


@questions_routes.route('/', methods=['GET'])
def questions_handler():
    if request.method == 'GET':
        question_query = Question.query.all()
        question_random = question_query[random.randint(0, (len(question_query) - 1))]
        question = question_random.to_dict()

        return {'question': question}

@questions_routes.route('/live', methods=['GET'])
def live_questions_handler():
    if request.method == 'GET':
        question_list = []
        question_query = Question.query.all()
        for i in range(3):
            question_random = question_query[random.randint(0, (len(question_query) - 1))]
            question = question_random.to_dict()
            while question in question_list:
                question_random = question_query[random.randint(0, (len(question_query) - 1))]
                question = question_random.to_dict()
            question_list.append(question)

        return {'questions': question_list}
