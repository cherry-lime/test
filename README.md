# Test Advisor
Before running, make sure a database URL, a secret key JWT_SECRET and an expiration date for that key EXPIRESIN is included in the .env file.

### Install Prisma and generate Prisma client:
```
$ npm install prisma --save-dev
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
