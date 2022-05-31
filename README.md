# Test Advisor
[![Code Quality](https://deepscan.io/api/teams/17760/projects/21098/branches/596791/badge/grade.svg?token=a1fa0980263b30233c0ddf1e9c3ed778290db2ee)](https://deepscan.io/dashboard#view=project&tid=17760&pid=21098&bid=596791)
[![Coverage](https://codecov.io/gh/PaulVlas/testadvisor/branch/master/graph/badge.svg?token=HIEJAV3H76)](https://codecov.io/gh/PaulVlas/testadvisor)

Before running, make sure a database URL is included in the .env file.

### Install Prisma and generate Prisma client:
```
$ npx prisma generate
```
### When there is a change in the database schema:
```
$ npx prisma migrate dev 
```

### Install the node modules:
```
$ npm install

$ npm install --save @nestjs/passport passport passport-local 
$ npm install --save-dev @types/passport-local 

$ npm install --save @nestjs/jwt passport-jwt 
$ npm install --save-dev @types/passport-jwt 

$ npm i --save class-validator class-transformer 

$ npm install bcrypt 
```

### Run the web app:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### View the generated API Documentation
```
http://localhost:{process.env.PORT}/api
OR, if port not specified
http://localhost:5000/api
```
