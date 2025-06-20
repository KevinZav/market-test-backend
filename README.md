# Marketplace APP

Welcome to Marketplace Backend.

## 🚀 Technologies

Nest.JS

TypeScript

PostgreSQL

TypeORM

## 1. Installation

Requirements

- Node.js v20.19.2

It's recommended to use a Node version manager like nvm to ensure the correct version.

````bash
nvm use
npm install
````

## 2. Add environments

Add .env file and declare all variables like .example.env file. This variable is for database and jwt token

````env
POSTGRES_DB=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
JWT_SEED_PUBLIC=
JWT_SEED_SECRET=
JWT_SEED_EXPIRETIME=
````

## 3. Run project (local)

````bash
npm run start:dev
````
