import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, emit
from flask_mail import Mail, Message

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.video_routes import videos_routes
from .api.question_routes import questions_routes
from .api.feedback_routes import feedback_routes
from .api.token_route import token_route

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://interviewbotio.herokuapp.com",
        "https://interviewbotio.herokuapp.com"
    ]
else:
    origins = "*"
# Match making for live interview
socketio = SocketIO(app, cors_allowed_origins=origins)

open_rooms = []



@socketio.on('searching')
def handle_search(user):
    if len(open_rooms) > 0 :
        room = open_rooms.pop()
        emit('partner-found', room , broadcast=True)
    else:
        open_rooms.append(user['username'])

@socketio.on('exit')
def handle_search(user):
    print(user)
    print(open_rooms, '*************************************')
    if user['username'] in open_rooms:
        index = open_rooms.index(user['username'])
        open_rooms.pop(index)
# Mail
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

@app.route('/mail', methods=['POST'])
def mail_handler():
    msg = Message('Feedback form', sender ='noreplymikemihalchik@gmail.com', recipients = ['mikemihalchik@gmail.com'])
    data = request.json
    msg.body = data['body']
    mail.send(msg)
    return {"Success": "true"}




@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(feedback_routes, url_prefix='/api/feedback')
app.register_blueprint(questions_routes, url_prefix='/api/questions')
app.register_blueprint(videos_routes, url_prefix='/api/videos')
app.register_blueprint(token_route, url_prefix='/api/token')
#app.register_blueprint(mail_route, url_prefix='/api/mail')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response
#route static resources from the public folder
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    elif 'model-weights' in path:
        return app.send_static_file(path)
    elif 'model-shard' in path:
        return app.send_static_file(path)
    elif '.png' in path:
        return app.send_static_file(path)
    elif '.gif' in path:
        return app.send_static_file(path)
    elif '.jpg' in path:
        return app.send_static_file(path)
    return app.send_static_file('index.html')
if __name__ == '__main__':
    socketio.run(app)
