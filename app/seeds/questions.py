from app.models import db, Question
# Adds a demo question, you can add other users here if you want
def seed_questions():
    content = """Give me an example of when you used logic to solve a problem.:
Speak to a specific situation, the problem, the resolution and how you came to it, and the results
/
Explain a time when you took the initiative on a project.:
Speak to a specific situation, give credit to your team or coworkers and how you went beyond your daily responsibilities
/
Describe how you used your problem-solving skills to benefit a team or company.:
Speak to the specific situations to demonstrate how you look for solutions for the greater good of the company, not just yourself or a small team.
/
Tell me about a time when you used creativity to overcome a dilemma.:
Think about a way that you surprised yourself with an unexpected idea. Did you follow a ‘creative process’? Or was your creativity more spontaneous in the situation?
/
What’s the best idea you’ve come up with on a team-based project?:
Brainstorm at least three different ideas and be prepared to discuss one during your interview. Focus on the ones that had the biggest impact.
/
How do you approach problems? What’s your process?:
 Focus on the approach you use to solve problems. How do you break them down into steps in order to solve them? What tools and techniques do you use to work through a problem?
/
Tell me about a time when you were consulted for a problem.:
The interviewer wants to know what you are remembered for among the people who know you. Do your friends come to you for relationship advice, professional advice or to brainstorm solutions? Do they ask you for places to visit around town? Think about what you know a lot about, and what your friends know & think about you too!
/
Name three improvements you made in your most recent position.:
Make a list so that you’re not stumbling over your words during the interview. Focus more on the result you achieved for this question, and have the ‘3 things’ ready to discuss.
/
Have you ever worked with a team before?:
Don’t just answer “yes” or “no,” but also describe your role(s) within any team you’ve worked within. Explain the focus of your team, the objectives you had and give detail on the size and growth during your time in the role.
/
Are you better at working with a team or working on your own?:
To answer that you’re a team player is almost always the right response.
/
Give me an example of when you worked well with a team.:
Make a list of these examples ahead of your interview so that you’re comfortable with these ideas. Focus on the times where you were able to deliver a business result, rather than just hanging out at the pub on a Friday.
/
What role do you assume when you work within a team?:
Although you may have assumed many different roles, focus on the one that showcases your skill set. Give a response that aligns with the current role you’re interviewing for
/
Have you worked on different types of teams? What was your favorite?:
Describe the benefit of each team you’ve worked within. Focus on the reasons why you enjoyed that team – if it was a personality and culture alignment, or you delivered an awesome project together, both work well.
/
What do you do if you disagree if another team member?:
Choose a time when you disagreed about a work-related issue, not a personal one, and explain how you tackled the case. Focus on your communication and negotiation skills. Try not to let your ego get in the way.
/
Describe a time when you disagreed with a team member. How did you resolve the problem?:
Explain how you worked through the issue – show off your communication skills, it’s ok if you didn’t come out of the disagreement on top, your interviewer is looking for your ability to handle conflict.
/
Tell me about a time when you failed in a team project, and how you overcame it.:
 Be honest and show how you can learn from failures. Don’t blame your team members for your failure, focus on the objective reasons that led to team failure and what you learned.
/
Tell me about a time when you failed.:
Everybody fails sometimes, and it shows humility to admit it. Always highlight the takeaway and what you learnt from the experience.
/
Have you ever made a mistake?:
 Of course you have! Be honest and describe the mistake and what you learned from it. This can be a personal mistake you made and learned from. The interviewer is wanting to know more about your attitude towards how you handle mistakes.
/
Tell me about a big mistake you’ve made on the job and how you handled it.:
 Choose a mistake from when you first started working on a job and describe your progression.
/
Tell me of a time when you didn’t meet your goals.:
 Choose a story with an acceptable solution. It’s ok to not always meet your goals, as long as you had valid reasons and achieved something at the end.
/
What is your biggest regret at work?:
 Keep it goal focused and don’t insert anything personal. The lighter you keep this, the better.
/
Are you someone who learns from failures?:
 Describe why you enjoy feedback, even in the form of failures. Present failures as lessons.
/
Tell me about a time when you tried something risky and failed.:
 Bring humor into it. This is a great way to also be honest and transparent about your failures!
/
Tell me about a decision that you’ve regretted and how you overcame it.:
 Allow the interview to see your vulnerable side and your attitude towards overcoming bad decisions.
/
Give me an example of when you had to assume leadership for a team.:
 Describe your initial uncertainty and how you were able to overcome it. What did you do to step up as a leader in the situation? Did you speak up? Did you facilitate?
/
Have you ever had to set goals for a team?:
 Discuss how you set goals and which goals are the most important for you. Having an approach to set goals that’s easy to explain is great.
/
Give me an example of when you set a goal and how you achieved it.:
 Describe how you go about setting goals. Make it sound as realistic as possible, and describe the specific actions you take to get there.
/
Describe a time when you were able to motivate unmotivated team members.:
 Focus on your team-building skill set. What do you do to inspire those around you?
/
Tell me of a time when you postponed making a decision.:
 Tie it into a professional event. Ensure the decision is about something that wasn’t too important.
/
Give me an example of when you delegated work across an entire team.:
 Focus on how you’re able to see the unique skills of each team member.
/
How do you juggle multiple projects?:
 Describe your process for handling multiple tasks at the same time.
/
Have you ever had to counsel a difficult team member? Tell me about that time.:
 Pick a time when you had to deliver uncomfortable counsel to a team member.
/
Tell me about a time when you worked well under pressure.:
 Make a list of three times and choose the best one. The more important thing is to talk about your mindset when you’re in a pressure situation. Are you mindful about the pressure you’re facing? Or do you just crumble under pressure?
/
What is the most difficult or challenging situation you’ve ever had to resolved in the workplace?:
 Include the takeaway. Ensure it’s a very challenging situation. Grab the interviewer’s interest by building a credible story around your experience.
/
How do you handle unexpected changes or challenges?:
 Focus on your personal growth, your attitude towards change, your flexibility of mindset and your willingness to embrace change with an open mind.
/
Have you ever been lied about? How did you handle that situation?:
 Describe a work-related situation. Was it a customer who lied to you about something? Or a colleague? How did you handle the situation? Ensure you reveal how you realized that you’d been lied to through the power of intelligent questioning.
/
Tell me about a time when you disagreed with a supervisor.:
 Focus on an event with an amicable solution. Present your disagreement as a time for mutual growth.
/
Tell about a conflict at your job.:
 Keep it focused on a work-related conflict, and what you learned from it.
/
Tell me a time when you had to work unexpectedly on your own.:
 Describe how you were able to use existing skills or learn skills to work by yourself. Demonstrate that you are comfortable in your skin and can work independently when required.
/
Describe a time when you faced a block at work and how you solved it.:
 Work through your process of resolving blocks.

"""
    content_list = content.split('/')
    for question_obj in content_list:
        question = question_obj.split(':')
        seed_question = Question(questions_text= question[0], questions_answer= question[1])
        db.session.add(seed_question)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_questions():
    db.session.execute('TRUNCATE questions;')
    db.session.commit()
