#  MindShare
## Team project for Web Technologies at FH Campus Wien
<br>

### Install dependencies

Make sure that you have [node and npm](https://nodejs.org/en/download) installed. If you do, then navigate to the `/backend` folder and run 
```
npm install
```
to install the required dependencies.

<br>

### Docker
The project uses docker containers, so you should have the [docker](https://www.docker.com/) engine installed on your machine.<br>

At the moment, there are three services: 
- a `mongo` database
- a `mongo-express` service, which is a web-based MongoDB admin interface
- a `libre-translate` service, which provides a REST API for detecting text language and translating from one language to another. See the [API specification](https://libretranslate.com/docs/#/) and the project's [GitHub page](https://github.com/LibreTranslate/LibreTranslate) for more info

Before starting the containers you need to add the necessary environment variables in the `.env` file:
```
APP_BACKEND_PORT            - the backend application server port. Not needed for docker, but needs to be set nonetheless for the application to run
LIBRETRANSLATE_LANGUAGES    - the languages to load. By default loads only en, es, de, it, fr
LIBRETRANSLATE_PORT         - the port where the libre-translate service can be accessed
MONGO_ROOT_USER             - the db user
MONGO_ROOT_PASSWORD         - the db password
MONGO_HOST                  - the host where the db is running, locally should be set to 'localhost'
MONGO_PORT                  - the port where the mongoDB can service can be reached
MONGO_DB_NAME               - the database name
MONGO_DB_COLLECTION         - the initial collection inside the database specified above
MONGOEXPRESS_LOGIN          - the user for the UI interface login
MONGOEXPRESS_PASSWORD       - the password for the UI interface login
MONGOEXPRESS_PORT           - the port where to access the web UI interface
```
From the `repository root directory` run 
```
docker compose up
``` 
to spin up the containers described in the `docker-compose.yml` file. 

The MongoDB service will create a directory `db` where it stores the database.<br>
The MongoExpress UI takes some time until it can connect to the database service.<br>
The libre-translate service will also create a .lt-local directory to cache the configured languages and take some time until it downloads the configured languages and it's accessible.<br>
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