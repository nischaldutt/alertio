<div>
  <h1 align="center">
    <a href="https://alertio-backend.herokuapp.com/">AlertIO: An Alert Management Application</a>
  </h1>
  <strong>
    Never miss a critical alert!
  </strong>
  <p>
    A fullstack web app built with
    <a href="https://react-redux.js.org/">React-Redux</a>, 
    <a href="https://expressjs.com/">Express.js</a>, 
    <a href="https://socket.io/">Socket.io</a> 
    to deliver realtime updates and alerts.
  </p>
</div>

<hr />

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/nischaldutt/alertio)
[![MIT Licence](https://img.shields.io/badge/Licence-MIT-blue)](https://github.com/nischaldutt/alertio/blob/main/LICENSE)

## Features

- 🔔 Respond to critical issues before they impact your business.
- ⏰ Intuitive actionable realtime alerting.
- 👥 Multi-user alerting/Group alerting implemented with [Socket.io Rooms](https://socket.io/docs/v4/rooms/).
- 💻 Admin dashboard to view all branches.
- 🔐 Authorized requests and secure information exchanges using [JSON Web Token](https://dev.twitch.tv/docs/embed/chat) embedded in server APIs.
- 📱 Fully Responsive application.

## Video Walk-Through

<div>
  <a href="https://youtu.be/b6etTkG54e4" target="_blank">
    <img
      alt="AlertIO: An Alert Management Application | Video-Walkthrough"
      src="https://i.imgur.com/uGfO0SF.png"
    />
  </a>
</div>

## ScreenShots

<div>
    <img
      alt="Home"
      src="https://i.imgur.com/jfla1KV.png"
    />
  <hr />
    <img
      alt="Admin login"
      src="https://i.imgur.com/3i4r9MG.png"
    />
  <hr />
    <img
      alt="Customer search"
      src="https://i.imgur.com/iFMkhUi.png"
    />
  <hr />
    <img
      alt="Admin dashboard"
      src="https://i.imgur.com/XRAE1Pk.png"
    />
  <hr />
    <img
      alt="Notification"
      src="https://i.imgur.com/eCSZ57j.png"
    />
</div>

## Technology stack

### Frontend

- UI framework used: [React.js](https://reactjs.org/)
- State management library used: [React-Redux](https://react-redux.js.org/)
- Component design: [Material UI](https://material-ui.com/)
- API Client: [Axios](https://www.npmjs.com/package/axios)
- Client side routing: [React Router](https://www.npmjs.com/package/react-router-dom)
- State persistance: [Redux Persist](https://www.npmjs.com/package/redux-persist)
- Async API calls: [Redux Thunk](https://www.npmjs.com/package/redux-thunk)

### Backend

- Server: [Express.js](https://expressjs.com/)
- Password Encryption: [Bcrypt](https://www.npmjs.com/package/bcrypt)
- Input Validation: [Joi](https://www.npmjs.com/package/joi)
- Authorization: [JSON Web Tokens](https://www.npmjs.com/package/joi)
- Real-time alerts: [Socket.io](http://socket.io/)

### Databases

- Primary database to store all information related to branches, admins and alerts: [MySQL](https://www.npmjs.com/package/mysql)
- Refresh tokens: [Redis](https://www.npmjs.com/package/redis)

## Hosting

- [Heroku](https://www.heroku.com/)

## State

You can have a look at the state of the application by installing [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

## API Documentation

### Introduction

The Server APIs are defined in `/server/request.rest` file. To setup the server at your localhost, you can install
the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) in VS Code or you can directly
use [Postmam](https://www.postman.com/) to test the endpoints.

### Authorization

Some API requests require the use of a access token. You can generate the new token by hitting the
`/admin/login` endpoint.

</hr>
Please note that this token will be valid for a span of 1 minute ony, after that 
you will need to use refresh token to get a new refreshed token.

To authenticate an API request, you should provide your access token in the `Authorization` header.

```http
GET /admin/dashboard
Authorization: Bearer ACCESS_TOKEN
```

| Parameter     | Type     | Description                     |
| :------------ | :------- | :------------------------------ |
| `accessToken` | `string` | **Required**. Your Access Token |

### API Reference

| Endpoint                    | Type | Description                                       |
| :-------------------------- | :--- | :------------------------------------------------ |
| `/admin/register`           | POST | Register a new Admin                              |
| `/admin/login`              | POST | Sign in the admin account                         |
| `/admin/login`              | GET  | Check if the admin is already logged in           |
| `/admin/dashboard`          | GET  | Get information of all branches                   |
| `/auth/token`               | POST | Get a refreshed access token                      |
| `/admin/logout`             | POST | Logout from the admin account                     |
| `/branch/login`             | POST | Enter a particular branch to get the notification |
| `/customer/get_branch_info` | GET  | Get branches serving at searched pin code         |

### Responses

API endpoints return the JSON representation of the resources created or edited.

```javascript
{
  "message" : string,
  "status"  : number,
  "data"    : string
}
```

The `message` attribute contains a message commonly used to indicate errors or, in the case of deleting a resource, success that the resource was properly deleted.

The `status` attribute describes if the transaction was successful or not.

The `data` attribute contains any other metadata associated with the response. This will be an escaped string containing JSON data.

### Status Codes

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |

## Local setup

```
git clone https://github.com/nischaldutt/alertio.git

cd client
npm install

cd ../server
npm install
```

## Running the app locally

To get the app up and running (and really see if it worked), run:

```shell
cd client
npm start
```

```shell
cd server
npm run dev
```

This should start up your browser. If you're familiar, this is a standard
[react-scripts](https://create-react-app.dev/) application.

You can also open
[the deployment of the app on Heroku](https://alertio-backend.herokuapp.com/).
