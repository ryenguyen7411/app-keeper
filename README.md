### Development with Docker

- Step 0: Install NodeJS (https://nodejs.org), Docker (http://docker.com/) and docker-compose (https://docs.docker.com/compose/).

- Step 1: ```docker-compose build```.
- Step 2: Open new terminal and run ```docker-compose run --rm server sequelize db:migrate```, then ```docker-compose run --rm server sequelize db:seed:all```.
- Step 3: Copy ```.env.example``` to ```.env``` (in root folder) and fill in all information.
- Step 4: Run command ```docker-compose up``` and wait for all container is up.

Open web browser at ```http://localhost:5000``` (frontend) and ```http://localhost:5050``` (backend).
Open ```http://localhost:5050/graphiql``` for API testing, using GraphQL.

Technology used: ```ReactJS```, ```ExpressJS```, ```GraphQL```, ```Sequelize```, ```Docker```, ```docker-compose```
