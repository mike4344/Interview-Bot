from .db import db

class Video(db.Model):
  __tablename__ = 'videos'

  id = db.Column(db.Integer, primary_key = True)
  video = db.Column(db.String(255))
  title = db.Column(db.String(255))
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))

    user = db.relationship('User', backref='users_video', foreign_keys = [user_id])
    question = db.relationship('Question', backref='questions', foreign_keys = [question_id])


  def to_dict(self):
    return {
      "id": self.id,
      "feedback_text": self.feedback_text,
      "feedback_video": self.feedback_video,
      "video_id": self.video_id,
      "question_id": self.question_id
    }
