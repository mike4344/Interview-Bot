# Interview Bot, An interview practice platform

![Intro](https://github.com/mike4344/Interview-Bot/blob/main/react-app/public/robotsplash.gif?raw=true)
# Interview Bot
## _Interview Prep Platform_


Interview Bot is a series of tools for job seekers

## Features

- Perform virtual interviews on demand with random interview question
- Receive feedback on facial expressions and your answer to the interview question
- Perform live video interviews with random User
- Virtual interview guide

## Tech

Interview Bot uses a number of open source projects to work properly:

- ReactJS -
- Flask -
- Web Sockets -
- Twilio API -
- Face-API -
- AWS S3 -
- Profanity-check -
- PostgreSQL -
- Redux -

## Installation

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/mike4344/Interview-Bot.git
cd create react-app
npm install
cd ..
pipenv shell
pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

```


## Features


### Users can view a guide to virtual interviews
![Interview guide](https://github.com/mike4344/Interview-Bot/blob/main/react-app/public/interview-guide-screen.png?raw=true)


### Users can perform virtual interviews with random curated interview questions. Users can record their answer as well as have the question read aloud to them.
![Interview page](https://github.com/mike4344/Interview-Bot/blob/main/react-app/public/interview-screen.png?raw=true)


### Users receive feedback on the their answer including putting it through a profanity filter checking word frequency
![Interview text feedback](https://github.com/mike4344/Interview-Bot/blob/main/react-app/public/text-feedback-screen.png?raw=true)


### Users receive feedback on their answer through the use of facial and emotive recognition to check the most likely emotion the user is displaying and giving them feedback based on the results
![Interview video feedback](https://github.com/mike4344/Interview-Bot/blob/main/react-app/public/video-feedback-screen.png?raw=true)


### Users can perform live interviews with other users
![Interview live video](https://github.com/mike4344/Interview-Bot/blob/main/react-app/public/live-interview-screen.png?raw=true)


### Users are matched using custom matchmaking through the use of web sockets
![Interview matchmaking](https://github.com/mike4344/Interview-Bot/blob/main/react-app/public/graphic%20for%20searching.gif?raw=true)


### Users can communicate using video and audio with another user when interviewing
![Interview live page](https://github.com/mike4344/Interview-Bot/blob/main/react-app/public/live-chat-screen.png?raw=true)
