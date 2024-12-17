# Project Setup and Running Instructions
This project uses Docker and Docker Compose to easily set up and run a TypeScript Express application with a PostgreSQL database. To get started, follow the steps below.

Prerequisites
Before you begin, ensure that you have the following installed on your machine:

Docker
Docker Compose

## Setup Instructions


1. Create the .env File
To configure the environment variables for the project, you need to create an .env file. Follow these steps:

In the root of the project, you will find a file named .env.example.

Copy the contents of .env.example to a new .env file.
```bash
cp .env.example .env
```
Open the newly created .env file and update any environment variables if necessary (e.g., database connection settings, API keys, etc.).

Example of .env content:

```bash
DATABASE_URL=postgres://postgres:postgres@db:5432/blog_app
```

This environment variable contains the connection string for your PostgreSQL database.

2. Build and Run the Project with Docker Compose
Once you've set up the .env file, you can use Docker Compose to build and run the project. Follow these steps:

Build and start the services:

Run the following command to start the services defined in your docker-compose.yml file:

```bash
docker-compose up --build
```
--build ensures that Docker rebuilds the images, including any changes you've made to your Dockerfile or dependencies.
Access the running services:

Docker Compose will automatically set up your services and run them. The application should now be running, and you can access it via the ports you've defined in the docker-compose.yml file (e.g., localhost:3000 for your Express app).

Stop the services:

To stop the running services, simply run:
```bash
docker-compose down
```
This will stop and remove all containers, networks, and volumes defined in your docker-compose.yml file.

