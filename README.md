# Test Advisor
[![Code Quality](https://deepscan.io/api/teams/17760/projects/21098/branches/596791/badge/grade.svg?token=a1fa0980263b30233c0ddf1e9c3ed778290db2ee)](https://deepscan.io/dashboard#view=project&tid=17760&pid=21098&bid=596791)
[![Coverage Status](https://coveralls.io/repos/github/PaulVlas/testadvisor/badge.svg?t=mCeDKx)](https://coveralls.io/github/PaulVlas/testadvisor)

## Running frontend
Information required to run the frontend is available in `testadvisor/advisor-frontend/README.md`

## Running backend
Information required to run the backend is available in `testadvisor/advisor-backend/README.md`

## CI/CD (Continuos Integration and Continuos Development)

### Repository wide
* Static analysis for JavaScript (DeepScan)
* Automatic dependency updating (Renovate)
* Code coverage of code base (Codecov, GitHub Actions)

### Master branch
* Master branch is protected and kept at production level
* Changes to the master branch are automatically deployed to Microsoft Azure (GitHub Actions)
* Automatic frontend, backend code quality/correctness testing (Jest (backend), Vitest (frontend), ESLint, GitHub Actions)

### Pull request / push
* Automatic frontend, backend code quality/correctness/style testing on pull request / push (Jest (backend), Vitest (frontend), ESLint, Prettier, GitHub Actions)
