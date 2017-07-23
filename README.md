Template for a full-featured [MERN stack](http://mern.io)/[Typescript](http://www.typescriptlang.org) & [Swagger](https://swagger.io)/[InversifyJS](http://inversify.io) APIs server with [nodemon](https://nodemon.io) to monitor for any changes in your source and automatically restart Node server
# Content
<!-- TOC -->

- [Content](#content)
- [I. Features](#i-features)
- [II. Using the template](#ii-using-the-template)
- [III. Create the template](#iii-create-the-template)
    - [1. ExpressJS with Typescript](#1-expressjs-with-typescript)
        - [Install initial packages](#install-initial-packages)
        - [Create tsconfig](#create-tsconfig)
        - [npm start command](#npm-start-command)
        - [Create app entry](#create-app-entry)
        - [Test express server](#test-express-server)
    - [2. Configuration](#2-configuration)
        - [Install config packages](#install-config-packages)
        - [Create development config](#create-development-config)
        - [Create AppConfig class](#create-appconfig-class)
        - [Using the config in app](#using-the-config-in-app)
        - [nodemon monitors config changes](#nodemon-monitors-config-changes)
        - [Test config changes](#test-config-changes)
    - [3. InversifyJS](#3-inversifyjs)
        - [Install Inversify packages](#install-inversify-packages)
        - [Update tsconfig for Inversify](#update-tsconfig-for-inversify)

<!-- /TOC -->
# I. Features
- Node/ExpressJS Server with nodemon
- Inversify for DI/IoC to build testable RESTful APIs
- Swagger UI specs & Generates code using swagger-cli tool
- Mongoose & strongly-typed model objects
- Logging
- OAuth2
- Configuration:
    - Settings isolation for development/test/uat/production
    - CORS: cross-origin config (to allow hosted client in difference server/port)
    - Server port config
    - Connection string to MongoDB
    - Logger
# II. Using the template
```bash
npm install
npm start
chrome http://localhost:3000
```
# III. Create the template
## 1. ExpressJS with Typescript
### Install initial packages
```bash
# Create package.json
npm init -y

# Install development tools
npm install --save-dev typescript ts-node nodemon @types/debug @types/node @types/express

# Install development libs
npm install --save express
```
### Create tsconfig
```bash
node ./node_modules/typescript/lib/tsc --init # create tsconfig.json
```
```json
{
  "compilerOptions": {
    "target": "es6",
    "sourceMap": true
  }
  ,"exclude": [
    ".vscode",
    "node_modules",
    "bin",
    "config"
  ]
  ,"include": [
    "src/**/*.ts"
  ]
}
```
### npm start command
```json
// package.json
..
"scripts": {
  "start": "./node_modules/.bin/nodemon --watch src/**/*.ts --exec .\\node_modules\\.bin\\ts-node src/app.ts"
},
..
```
### Create app entry
```typescript
// src/app.ts
import * as express from 'express';

const app = express();
app.get('/', (req, res) => { res.send(`<b>Time:</b> ${new Date()}`); });
app.listen(3000, () => console.log('Server listening on port 3000!'));
```
### Test express server
```bash
npm start
chrome http://localhost:3000
```
## 2. Configuration
### Install config packages
```bash
npm install --save config
npm install --save-dev @types/config
```
### Create development config
```json
{
    "Port": 3000 // server listen port (default to 3000 if not set)
}
```
### Create AppConfig class
```typescript
// app/AppConfig.ts
import * as c from "config";

interface IAppConfig extends c.IConfig {
    Port: number;
}

var config: IAppConfig = <IAppConfig>c;
export default config;
```
### Using the config in app
```typescript
import config from './config/AppConfig';
app.listen(config.Port || 3000, () => console.log(`Server listening on port ${config.Port || 3000}!`));
```
### nodemon monitors config changes
```json
"scripts": {
    "start": "./node_modules/.bin/nodemon --watch src/**/*.ts --watch config/*.json --exec .\\node_modules\\.bin\\ts-node src/app.ts"
},
```
### Test config changes
```bash
npm start
# Edit config port to 3001 (in config/development.json)
chrome http://localhost:3000
chrome http://localhost:3001
```
## 3. InversifyJS
Please see [InversifyJS installation guide](https://github.com/inversify/InversifyJS#installation) for more information
### Install Inversify packages
```bash
npm install --save inversify reflect-metadata
npm install --save-dev @types/reflect-metadata
```
### Update tsconfig for Inversify
**moduleResolution** set to **node** (instead of default **classic**) to solve the issue [Cannot find module 'inversify'](https://github.com/inversify/InversifyJS/issues/384) in **VSCode**. As there isn't separated typing for @types/inversify accordding to comment from InversifyJS's owner on their [npm package](https://www.npmjs.com/package/@types/inversify).
```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": ["reflect-metadata"],
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```
