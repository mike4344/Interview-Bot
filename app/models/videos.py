from .db import db

class Video(db.Model):
  __tablename__ = 'videos'

  id = db.Column(db.Integer, primary_key = True)
  video = db.Column(db.String(255))
  title = db.Column(db.String(255))
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))

  questions = db.relationship('Question', back_populates = 'videos')
  users = db.relationship('User', back_populates = 'videos')
  feedback = db.relationship('Feedback', back_populates = 'videos')

  def to_dict(self):
    return {
      "id": self.id,
      "video": self.video,
      "user_id": self.user_id,
      "question_id": self.question_id
    }
