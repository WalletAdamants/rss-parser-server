# RSS Parser Server

## General

This is a simple server-side application for parsing [Lifehacker RSS](https://lifehacker.com/rss) feed.
App is based on [express-framework](http://expressjs.com) and written on vanilla JS.

## App Stack

**For parsing RSS** this app uses the following packages/libraries:
 - [puppeteer](https://github.com/puppeteer/puppeteer) - for "emulating" chrome-browser in node.js
 - [cheerio](https://cheerio.js.org/) - for parsing markup and providing manipulations with the resulting data structure
 - [node-schedule](https://github.com/node-schedule/node-schedule#readme) - for scheduling parser's jobs

 Also next packages are used in app to provide it functionality:
 - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - for smooth and secure auth process
 - [mongoose](https://mongoosejs.com/) - for providing data storing in MongoDB
 - [nodemailer](https://nodemailer.com/) - for sending confirmation email to registered users

## App Functionality

This app parses **lifehacker RSS** for new posts by schedule and stores data in MongoDB. The RSS parsing is configured with cron-like schedule (by default it performs parsing every hour). For comfortable hand-shaking with this app, the database is seeded with mock data on container's start. Unauthorized users can get all posts using pagination, filter by creators and categories, sort by date and title, search by title and description as well. Registered and authorized users (admins) can perform CRUD operations on posts, categories and creators. After successful registration, new admin receives an email for confirmation.
### N.B.!:

If you want to **sign in** as admin in dev mode without email verification, feel free to use next credentials (no worries: this won't hurt any app's security - this works only in container and local database):
 - **email**: __admin@gmail.com__
 - **password**: __Qwerty123-__

## Live Server App

The App Server is currently located on [heroku](https://www.heroku.com) platform. Here is [link](https://lifehacker-rss-parser-server.herokuapp.com/). 

## Docker and Makefile

This is containerized app. Please, check out `./Makefile` with most used commands for quick application start.
- `make up` | Start all containers (in background)
- `make down` | Stop all started containers
- `make shell-once` | Start node container
- `make run-start` | Start node container and start app
- `make run-dev` | Start node container and start app in development mode

### Please, feel free to use this repo)) 
Clone it, install dependencies, paste your environment variables described in .env-example files and run the app.