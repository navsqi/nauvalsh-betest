## Features

- **TypeScript:** TypeScript is a open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript. 
- **Express.js:** Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
- **Mongoose:** Elegant mongodb object modeling for node.js
- **Redis:** in-memory storage, used as a distributed, in-memory key–value database and cache
- **Testing with Jest:** Write unit tests and run them using the Jest testing framework.
- **Docker Integration:** Easily containerize your application using Docker for simplified deployment and scalability.

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

### Container
```bash
make build-dev
docker run -p 3001:3001 -d --name nauvalsh-betest  nauvalsh-betest:latest
```


### Unit Testing
```bash
npm run test
```

### Postman
Import postman collection & environtment from `./postman`. Update URL into `codeid-jenius-betest.nauvalsh.com`