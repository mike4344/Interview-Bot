from .db import db

class Question(db.Model):
  __tablename__ = 'questions'

  id = db.Column(db.Integer, primary_key = True)
  questions_text = db.Column(db.Text)
  questions_answer = db.Column(db.Text)
  question_followup = db.Column(db.Text)
  answer_filter = db.Column(db.Text)



  def to_dict(self):
    return {
      "id": self.id,
      "questions_text": self.questions_text,
      "questions_answer": self.questions_answer,
      "answer_filter": self.answer_filter
    }
