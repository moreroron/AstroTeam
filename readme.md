![alt text](https://raw.githubusercontent.com/moreroron/AstroTeam/1eec42b8c765de38edd6eee03b633e870c072cc8/cover.svg?raw=true)

A collaboration app made for teams which allows people to work with each other with ease. Assemble a team by choosing registered users (Google auth), create a list, add tasks and define their properties (priority, due date, type).


## Technologies
A mern stack app built with React, NodeJS/express, MongoDB.
- Using the latest features of React such as hooks and context API.
- An API built with NodeJS using express framework.
- Authentication with PassportJS
- Using Axios for fetching data
- Using D3.js JavaScript library for data visualization (display the quantity of opened tasks in each day and demographics for users using the app)
- Using Twitter API for fetching AstroTeam channel data.
- Using Google Maps API for pinning AstroTeam users on a map.
- Using SCSS + Bulma, a CSS framework for all app visuals.


## Before Installation

0. make sure you have `node` installed.
1. fill in all the keys in both `api/keys.js` and `frontend/keys.js`

## Installation

### server configuration

1. navigate to api folder
   `cd api`

2. install server dependencies
   `npm install`

3. run server (listening on port 3001, can be changed in `api/app.js`)
   `node app`

### client configuration

1. navigate to frontend folder
   `cd frontend`

2. install client dependencies
   `npm install`

3. run client
   `npm start`
