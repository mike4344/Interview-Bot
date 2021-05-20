import os
from dotenv import load_dotenv
from flask import Flask, request, abort, Blueprint
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant

token_route = Blueprint('token', __name__)

load_dotenv()
twilio_account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
twilio_api_key_sid = os.environ.get('TWILIO_API_KEY_SID')
twilio_api_key_secret = os.environ.get('TWILIO_API_KEY_SECRET')

@token_route.route('/', methods=['POST'])
def generate_token_route():
    data = request.get_json()
    identity = data.get('identity')
    room = data.get('room')

    token = AccessToken(twilio_account_sid, twilio_api_key_sid, twilio_api_key_secret, identity=identity, ttl=3600)
    token.add_grant(VideoGrant(room=room))
    token = token.to_jwt()
    token = token.decode('utf-8')
    return {'token': token}
