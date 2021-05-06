
from app.awshelper import(upload_file_to_s3, get_unique_filename)
from flask import Blueprint, jsonify, request
from app.models import User, Feedback, Video, Question, db



videos_routes = Blueprint('videos', __name__)


@videos_routes.route('/<video_id>/<question_id>/<user_id>', methods=['GET', 'POST'])
def fvideos_handler(video_id, question_id, user_id):
    if request.method == 'GET':
        video_query = Video.query.filter(Video.id == video_id).first()
        video = video_query.to_dict()
        return {'video': video}
    elif request.method == 'POST':
        if ("video" in request.files):
            video=request.files["video"]
            video.filename = get_unique_filename(video.filename)
            upload = upload_file_to_s3(video)
            url = upload["url"]
        else :
            url = ""
        data = request.json
        video = Video(
        video= url,
        user_id= user_id,
        question_id= question_id,)
        db.session.add(video)
        db.session.commit()
        return video.to_dict()