from .db import db

class Feedback(db.Model):
  __tablename__ = 'feedback'

  id = db.Column(db.Integer, primary_key = True)
  feedback_text = db.Column(db.Text)
  feedback_video = db.Column(db.Text)
  video_id = db.Column(db.Integer, db.ForeignKey('videos.id'))
  question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

  videos = db.relationship('Video', back_populates = 'feedback')
  questions = db.relationship('Question', back_populates = 'feedback')
  users = db.relationship('User', back_populates = 'feedback')


  def to_dict(self):
    return {
      "id": self.id,
      "feedback_text": self.feedback_text,
      "feedback_video": self.feedback_video,
      "video_id": self.video_id,
      "question_id": self.question_id,
      'user_id': self.user_id
    }
