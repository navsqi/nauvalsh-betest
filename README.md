## Features

- **TypeScript:** Enjoy the benefits of static typing, enhanced code maintainability, and better developer tooling with TypeScript.
- **Express.js:** Build powerful and flexible web APIs using the popular Express.js framework.
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
- **DB_HOST=** 127.0.0.1
- **DB_PORT=** 27017
- **DB_DATABASE=** dev
- **LOG_FORMAT=** dev
- **LOG_DIR=** ../logs

### Container
```bash
make build-dev
docker run -p 3001:3001 -d --name nauvalsh-betest  nauvalsh-betest:latest
```


### Unit Testing
```bash
npm run test
```