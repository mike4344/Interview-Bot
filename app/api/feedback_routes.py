from flask import Blueprint, jsonify, request
from app.models import User, Feedback, Video, Question, db
from profanity_check import predict_prob


feedback_routes = Blueprint('feedback', __name__)

@feedback_routes.route('/<int:user_id>/all')
def feedback_all(user_id):
    feedback_query = Feedback.query.filter(Feedback.user_id == user_id).all()
    feedback_list = [feedback.to_dict() for feedback in feedback_query]
    for feedback in feedback_list:
        video_query = Video.query.filter(Video.id == feedback['video_id']).first()
        video = video_query.to_dict()
        feedback['video'] = video
        question_query = Question.query.filter(Question.id == feedback['question_id']).first()
        question = question_query.to_dict()
        feedback['question'] = question
    return {'feedback': feedback_list}

@feedback_routes.route('/<int:feedback_id>', methods=['GET', 'POST', 'DELETE'])
def feedback_handler(feedback_id):
    if request.method == 'GET':
        feedback_query = Feedback.query.filter(Feedback.id == feedback_id).first()
        return {'feedback': feedback}
    elif request.method == 'POST':
        data = request.json


        feedback_text= data['feedback_text']
        feedback_video = data['feedback_video']
        if '*' in feedback_text:
            offensive = [1]
        else:
            offensive = predict_prob([feedback_text])
        feedback_text = feedback_text + ' Probability of the answer being offensive ' + str(int(offensive[0] * 100)) + '%'
        total = 1
        emotion_percentage = 'According to the Emotion recognition results '
        for emotion in feedback_video:
            total += feedback_video[emotion]
        for emotion in feedback_video:
            emotion_percentage +=  (str(int(feedback_video[emotion] / total * 100)) + '% ' + ': ' + emotion + ' ')



        feedback = Feedback(
        feedback_text= feedback_text,
        feedback_video= emotion_percentage,
        video_id= data['video_id'],
        question_id= data['question_id'],
        user_id = data['user_id'])
        db.session.add(feedback)
        db.session.commit()
        return feedback.to_dict()
    elif request.method == 'DELETE':
        feedback_query = Feedback.query.filter(Feedback.id == feedback_id).first()
        feedback = feedback_query.to_dict()
        video_query = Video.query.filter(Video.id == feedback.video_id).first()
        db.session.delete(video_query)
        db.session.delete(feedback_query)
        db.session.commit()
