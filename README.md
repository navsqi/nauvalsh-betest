## Features

- **TypeScript:** TypeScript is a open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript. 
- **Express.js:** Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
- **Mongoose:** Elegant mongodb object modeling for node.js
- **Redis:** in-memory storage, used as a distributed, in-memory key–value database and cache
- **Testing with Jest:** Write unit tests and run them using the Jest testing framework.
- **Docker Integration:** Easily containerize your application using Docker for simplified deployment and scalability.
- **User Authentication:** Includes a pre-configured user authentication system with password hashing using bcrypt and JWT-based authentication.


## Directory Structure
```bash
│
├───postman
│       be-test.postman_environment.json
│       nauvalsh-betest-api.postman_collection.json
│
└───src
    │   app.ts
    │   server.ts
    │
    ├───config
    │       index.ts
    │
    ├───controllers
    │       auth.controller.ts
    │       index.controller.ts
    │       users.controller.ts
    │
    ├───databases
    │       index.ts
    │
    ├───dtos
    │       users.dto.ts
    │
    ├───exceptions
    │       HttpException.ts
    │
    ├───interfaces
    │       auth.interface.ts
    │       routes.interface.ts
    │       users.interface.ts
    │
    ├───middlewares
    │       auth.middleware.ts
    │       error.middleware.ts
    │       validation.middleware.ts
    │
    ├───models
    │       users.model.ts
    │
    ├───providers
    │       redis.ts
    │
    ├───routes
    │       auth.route.ts
    │       users.route.ts
    │
    ├───services
    │       auth.service.ts
    │       users.service.ts
    │
    ├───tests
    │       auth.test.ts
    │       users.test.ts
    │       
    └───utils
            hash.ts
            logger.ts
            util.ts
            validateEnv.ts
```

## ⚒ How to Install

```bash
$ git clone https://github.com/navsqi/nauvalsh-betest.git
$ cd nauvalsh-betest
$ npm install
$ npm run dev
```
## Configuration

Before starting the project, make sure to set up your database credentials in the `.env.development.local` file. This file is used for local development and should not be committed to version control. Here's an example of how the `.env.development.local` file should be structured:

### Database Configuration
```bash
# PORT
PORT=3001

# DATABASE MONGODB URI
DB_URI="mongodb+srv://<username>:<password>@cluster0.vrytkfu.mongodb.net/db_nauvalsh_betest?retryWrites=true&w=majority&appName=Cluster0"

# TOKEN
SECRET_KEY=secretKey

# LOG
LOG_FORMAT=dev
LOG_DIR=../logs

# CORS
ORIGIN=*
CREDENTIALS=true

# REDIS
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_AUTH=masterpass

```

## Container
```bash
make build-dev
docker run -p 3001:3001 -d --name nauvalsh-betest  nauvalsh-betest:latest
```


## Unit Testing
```bash
npm run test
```

## Postman
Import postman collection & environment from `./postman`. Update URL into `codeid-jenius-betest.nauvalsh.com`



### Example curl

#### Login
```bash
curl --location 'codeid-jenius-betest.nauvalsh.com/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic YmFzaWNfYXV0aDpiYXNpY19hdXRo' \
--data-raw '{
    "userName": "nauvalsh@gmail.com",
    "password": "123"
}'
```


#### Get Users
```bash
curl --location 'codeid-jenius-betest.nauvalsh.com/api/v1/users?identityNumber=3173111111111002' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjEyNDE4ZDZjODBjYmIyODdmZTI1ZjEiLCJpYXQiOjE3MTI0OTY4MzIsImV4cCI6MTcxMjUwMDQzMn0.KMhBg3w5APuqtRH_zVJYS80fFG3wJUYNnmOOr_WC6_I'
```