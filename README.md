# Test Advisor
[![Code Quality](https://deepscan.io/api/teams/17760/projects/21098/branches/596791/badge/grade.svg?token=a1fa0980263b30233c0ddf1e9c3ed778290db2ee)](https://deepscan.io/dashboard#view=project&tid=17760&pid=21098&bid=596791)
[![Coverage](https://codecov.io/gh/PaulVlas/testadvisor/branch/master/graph/badge.svg?token=HIEJAV3H76)](https://codecov.io/gh/PaulVlas/testadvisor)

Before running, make sure a database URL is included in the .env file.

### Install Prisma and generate Prisma client:
```
$ npm install prisma --save-dev
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
