# helpME

helpME is an interactive social help network, where user can select category based on their preferences, post a question, answer, create group and events, personalize profile, contact volunteers from our community and quickly connect through chat anytime to get the help.

## Login Page (With and without Google Login)

![loginPage]()

### Register Page

![registerPage]()

### Category Page

![categoryPage]()

### Feeds Page

![feedsPage]()

## Post a Question

![postQuestion]()

### Post an Answer

![postAnswer]()

### Delete an Answer

![DeleteAnswer]()

### Group Page

![groupsPage]()

## Create Group

![createGroup]()

## Update Group

![updateGroup]()

### Events Page

![eventsPage]()

## Create Event

![createEvent]()

### Profile Page

![profilePage]()

### Get Help Page

![getHelpPage]()

### Chat

![chat]()

# Contributors

- [Meghal](https://github.com/meghal-softwaredev/)
- [Umang Patel](https://github.com/patumang)
- [Jesson Ziegler](https://github.com/jessonziegler)

# Stack

- Built using React, Node, Express and MongoDB.
- Google authentication used for login.
- JWT(JSON WEB TOKEN) and bcrypt used for authentication and authorization.
- Draft.js used for posting question and answer using WYSIWYG.
- redux used for State Management.
- Socket.io used for chat feature with websockets.
- Material UI for pre-made components.
- Styled with Material UI overrides and CSS/SCSS.

# Getting Started (/server)

## Setup API

Install dependencies with `npm install`

## Creating the DB

Setup database using MongoDB Atlas.

Copy the `.env.example` file and fill in the necessary configuration. 

```
PORT = your port
MONGODB_URL = your MongoDB URL
JWT_SECRET = your secret key

```

## Run The Server

Running the server normally

```sh
npm start
```

# Getting Started (/client)

## Install dependencies

Install dependencies with `npm install`

## Running

Running Webpack Development client by `npm start`

# Others

## Dependencies

- Node
- NPM
- axios
- bcryptjs
- cors
- dotenv
- express
- express-async-handler
- google-auth-library
- helmet
- jsonwebtoken
- mongoose
- socket.io
- moment
- mui
- dompurify
- draft-js
- sass
- react
- react-dom
- react-draft-wysiwyg
- react-google-login
- react-redux
- react-router-dom
- react-scripts
- react-scroll-to-bottom
- redux-thunk
- socket.io-client