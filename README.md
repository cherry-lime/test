# Test Advisor
Before running, make sure a database URL is included in the .env file.

### Install Prisma and generate Prisma client:
```
$ npx prisma generate
```

### Install the node modules:
```
$ npm install
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
