### Development with Docker

- Step 1: ```docker-compose build```.
- Step 2: Open new terminal and run ```docker-compose run --rm server sequelize db:migrate```, then ```docker-compose run --rm server sequelize db:seed:all```.
- Step 3: 

Open web browser at ```http://localhost:5000``` (frontend) and ```http://localhost:5050``` (backend).

Technology used: ```ReactJS```, ```ExpressJS```, ```GraphQL```, ```Sequelize```
