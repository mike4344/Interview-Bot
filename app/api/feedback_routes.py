from flask import Blueprint, jsonify, request
from app.models import User, Feedback, Video, Question



feedback_routes = Blueprint('feedback', __name__)


@feedback_routes.route('/<feedback_id>', methods=['GET', 'POST', 'DELETE'])
def feedback_handler(feedback_id):
    if request.method == 'GET':
        feedback_query = Feedback.query.filter(Feedback.id == feedback_id).first()
        feedback = feedback_query.to_dict()
        video_query = Video.query.filter(Video.id == feedback.video_id).first()
        video = video_query.to_dict()
        feedback['video'] = video
        return {'feedback': feedback}
    elif request.method == 'POST':
        data = request.json
        feedback = Feedback(
        feedback_text= data['feedback_text'],
        feedback_video= data['feedback_video'],
        video_id= data['video_id'],
        question_id= data['question_id'])
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


