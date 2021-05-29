# Interview Bot, An interview practice platform

![Intro](https://github.com/mike4344/Interview-Bot/blob/main/react-app/public/robotsplash.gif?raw=true)
# Interview Bot
## _Interview Prep Platform_


Interview Bot is a series of tools for job seekers

## Features

- Perform virtual interviews on demand with random interview question
- Recieve feedback on facial expressions and your answer to the interview question
- Perform live video interviews with random User
- Virtual interview guide

## Tech

Interview Bot uses a number of open source projects to work properly:

- ReactJS - HTML enhanced for web apps!
- Flask - awesome web-based text editor
- Web Sockets - Markdown parser done right. Fast and easy to extend.
- Twilio API - great UI boilerplate for modern web apps
- Face-API - evented I/O for the backend
- AWS S3 - fast node.js network app framework [@tjholowaychuk]
- Profanity-check - the streaming build system
- PostgreSQL - HTML
- Redux - duh

## Installation

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/mike4344/Interview-Bot
cd create react-app
npm install
cd ..
pipenv shell
pip
```


## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |

## Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
node app
```

Second Tab:

```sh
gulp watch
```

(optional) Third:

```sh
karma test
```

#### Building for source

For production release:

```sh
gulp build --prod
```

Generating pre-built zip archives for distribution:

```sh
gulp build dist --prod
```
