from .db import db

class Feedback(db.Model):
  __tablename__ = 'feedback'

  id = db.Column(db.Integer, primary_key = True)
  feedback_text = db.Column(db.Text)
  feedback_video = db.Column(db.Text)
  video_id = db.Column(db.Integer, db.ForeignKey('video_id'))
  question_id = db.Column(db.Integer, db.ForeignKey('question_id'))

  video = db.relationship('Video', backref='feedback_video', foreign_keys = [video_id])
  question = db.relationship('Question', backref='questions', foreign_keys = [question_id])



  def to_dict(self):
    return {
      "id": self.id,
      "feedback_text": self.feedback_text,
      "feedback_video": self.feedback_video,
      "video_id": self.video_id,
      "question_id": self.question_id
    }
