#  MindShare
## Team project for Web Technologies at FH Campus Wien
<br>

### Install dependencies

Make sure that you have `node` and `npm` installed. If you do, then navigate to the `/backend` folder and run 
```
npm install
```
to install the required dependencies.

<br>

### Docker
The project uses docker containers, so you should have the docker engine installed on your machine.<br>

Before starting the containers you need to add the necessary environment variables in the `.env` file:
```
MONGO_ROOT_USER         - the db user
MONGO_ROOT_PASSWORD     - the db password
MONGO_HOST              - the host where the db is running, locally should be set to 'localhost'
MONGO_PORT              - the port where the mongoDB is running
MONGO_DB_NAME           - the database name
MONGO_DB_COLLECTION     - the initial collection inside the database specified above
MONGOEXPRESS_LOGIN      - the user for the UI interface login
MONGOEXPRESS_PASSWORD   - the password for the UI interface login
MONGOEXPRESS_PORT       - the port where to access the web UI interface
```
From the `repository root directory` run 
```
docker compose up
``` 
to spin up the containers described in the `docker-compose.yml` file. The MongoDB will create a directory `db` where it stores the database.<br>
At the moment, there are two services: a `mongo` database and a `mongo-express` service, which is a web-based MongoDB admin interface.

<br>

### Start backend server

You can start the project in development mode by navigating to the `/backend` directory and running
```
npm run dev
```
which will start the server using `nodemon`. 

`nodemon` is a command-line tool that helps with the speedy development of Node.JS applications. 

It monitors your project directory and automatically restarts your node application when it detects any changes in the code.

When the application starts, it will automatically create a database for the application, as well as a collection, if they don't already exist.