See the API's [documentation](DOCS.md).

## Personals note

I used Express, mongoose and generator-rest for to create this todo backend.

The API is requestable at https://kidz-todo-list-backend.herokuapp.com

We have a classic CRUD for the Task collection.

The list endpoint is paginated to avoid sending too much data to the client.

## Commands

After you clone your project, these commands are available in `package.json`.

```bash
npm test # test using Jest
npm run coverage # test and open the coverage report in the browser
npm run lint # lint using ESLint
npm run dev # run the API in development mode
npm run prod # run the API in production mode
npm run docs # generate API docs
```

## Playing locally

```bash
$ mongod
```

Then, run the server in development mode.

```bash
$ npm run dev
Express server listening on http://0.0.0.0:9000, in development mode
```

## Directory structure

### Overview

```
src/
├─ api/
│  ├─ task/
│  │  ├─ controller.js
│  │  ├─ index.js
│  │  ├─ index.test.js
│  │  ├─ model.js
│  │  └─ model.test.js
│  └─ index.js
├─ services/
│  ├─ express/
│  ├─ mongoose/
├─ app.js
├─ config.js
└─ index.js
```

### src/api/

Here is where the API endpoints are defined. Each API has its own folder.

#### src/api/task/model.js

It defines the Mongoose schema and model for the API endpoint. Any changes to the data model should be done here.

#### src/api/task/controller.js

This is the API controller file. It defines the main router middlewares which use the API model.

#### src/api/task/index.js

This is the entry file of the API. It defines the routes using, along other middlewares (like session, validation etc.), the middlewares defined in the `task/controller.js` file.
