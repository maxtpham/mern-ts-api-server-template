Template for a full-featured [MERN stack](http://mern.io)/[Typescript](http://www.typescriptlang.org) & [Swagger](https://swagger.io)/[InversifyJS](http://inversify.io) APIs server with [nodemon](https://nodemon.io) to monitor for any changes in your source and automatically restart Node server
# Content
<!-- TOC -->

- [Content](#content)
- [I. Features](#i-features)
- [II. Using the template](#ii-using-the-template)
    - [1. Launch the app](#1-launch-the-app)
    - [2. Test the app](#2-test-the-app)
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
    - [3. IoC and DI with InversifyJS](#3-ioc-and-di-with-inversifyjs)
        - [Install Inversify packages](#install-inversify-packages)
        - [Update tsconfig for Inversify](#update-tsconfig-for-inversify)
    - [4. Mock the Mongoose with InversifyJS](#4-mock-the-mongoose-with-inversifyjs)
        - [Install MongoDB packages](#install-mongodb-packages)
        - [Create test configurations](#create-test-configurations)
        - [MongoClient class](#mongoclient-class)
        - [Initialize the InversifyJS](#initialize-the-inversifyjs)
        - [Test injection with MongoClient](#test-injection-with-mongoclient)
    - [5. Repositofy and Service pattern for the APIs](#5-repositofy-and-service-pattern-for-the-apis)

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
## 1. Launch the app
```bash
npm install
npm start
chrome http://localhost:3000
```
## 2. Test the app
```bash
npm install
npm run test
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
// tsconfig.json
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
// config/development.json
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
// src/app.ts
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
## 3. IoC and DI with InversifyJS
Please see [InversifyJS installation guide](https://github.com/inversify/InversifyJS#installation) for more information
### Install Inversify packages
```bash
npm install --save inversify reflect-metadata
npm install --save-dev @types/reflect-metadata
```
### Update tsconfig for Inversify
**moduleResolution** set to **node** (instead of default **classic**) to solve the issue [Cannot find module 'inversify'](https://github.com/inversify/InversifyJS/issues/384) in **VSCode**. As there isn't separated typing for @types/inversify accordding to comment from InversifyJS's owner on their [npm package](https://www.npmjs.com/package/@types/inversify).
```json
// tsconfig.json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": ["reflect-metadata"],
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```
## 4. Mock the Mongoose with InversifyJS
### Install MongoDB packages
Using [Mockgoose](https://www.npmjs.com/package/mockgoose) to mockup the Mongoose connection by an in-memory/temporary MongoDB storage for unit-test code. **Mockgoose** does not provide typing as it's simple enough to call wrapper function directly.
```bash
npm install --save mongoose
npm install --save-dev mockgoose @types/mongoose
```
### Create test configurations
```json
// package.json
"scripts": {
    "start": "set NODE_ENV=development&& .\\node_modules\\.bin\\nodemon --watch src/**/*.ts --watch config/*.json --exec .\\node_modules\\.bin\\ts-node src/app.ts",
    "test": "set NODE_ENV=test&& .\\node_modules\\.bin\\ts-node src/app.ts"
},
```
```json
// config/development.json
{
    "Port": 3000, // server listen port (if n/a then no server wil be created)
    "MongoDB": "mongodb://localhost/test"
}
```
```json
// config/test.json
{
    // UNSUED: "Port": 3000,
    "MongoDB": "mongodb://example.com/test"
}
```
```typescript
// src/config/AppConfig.ts
...
interface IAppConfig extends c.IConfig {
...
    MongoDB: string;
...
}
...
```
```typescript
// src/app.ts
...
if (config.Port) {
    // only create the ExpressJS app if config.Port available
    const app = express();
    ...
}
if (process.env.NODE_ENV === 'test') {
    console.log('[UNIT-TEST] is loading..');
...
    console.log('[UNIT-TEST] DONE!');
}
```
### MongoClient class
```typescript
// src/lib/MongoClient.ts
import * as mongoose from "mongoose";

export type MongoClient = mongoose.Mongoose;

export const TYPES = {
    MongoClient: Symbol("MongoClient"),
};

export async function createMongoClient(connectionString: string) {
    return new Promise<MongoClient>((resolve, reject) => {
        mongoose.connect(connectionString);
        mongoose.connection.on("error", (e: Error) => {
            console.log("MongoClient failed to connect to:", connectionString, e);
            reject(e);
        });
        mongoose.connection.once("open", () => {
            console.log("MongoClient connected to:", connectionString);
            resolve(mongoose);
        });
    });
}

export async function createMockgoClient(connectionString: string) {
    return new Promise<MongoClient>((resolve, reject) => {
        var Mockgoose = require('mockgoose').Mockgoose;
        var mockgoose = new Mockgoose(mongoose);
        mockgoose.prepareStorage().then(function() {
            mongoose.connect(connectionString);
            mongoose.connection.on("error", (e: Error) => {
                console.log("MockgoClient failed to connect to:", connectionString, e);
                reject(e);
            });
            mongoose.connection.once("open", () => {
                console.log("MockgoClient connected to:", connectionString);
                resolve(mongoose);
            });
        });
    });
}
```
### Initialize the InversifyJS
The bellow code will initialize the **Inversify Container** with the 1st binding for **MongoClient** to a pre-initialized instance (global instance), from now on, any instance injections will be returned the same **MongoClient** instance (hosted by **Inversify Container**).
```typescript
// src/app.ts
import "reflect-metadata";
import { Container, inject, injectable } from 'inversify';
import * as mongoclient from './lib/MongoClient';

(async () => {
    const container = new Container();
    container.bind<mongoclient.MongoClient>(mongoclient.TYPES.MongoClient).toConstantValue(
        process.env.NODE_ENV === 'test' ? await mongoclient.createMockgoClient(config.MongoDB) : await mongoclient.createMongoClient(config.MongoDB)
    );
})();
```
### Test injection with MongoClient
Add a injectable **Test** class with a **MongoClient** object property, then bind it to the **Inversify Container**.
```typescript
// src/app.ts
@injectable()
class Test {
    public mongoClient: mongoclient.MongoClient;

    public run(): void {
        console.log("MongoConnection:", this.mongoClient);
    }
}

container.bind<Test>(Test).toSelf();
```
Next, create the **Test** instance and run the method to see the value of **MongoClient**
```typescript
// src/app.ts
container.get<Test>(Test).run();
```
Run the code and see console output
```bash
npm run test
MongoConnection: undefined
```
Inject the **MongoClient** property with Inversify attibute
```typescript
// src/app.ts
@injectable()
class Test {
    @inject(mongoclient.TYPES.MongoClient)
    public mongoClient: mongoclient.MongoClient;
...
}
```
Run the code and see console output again to see the injection is working for now, by automatically assign the injection object property with value taken from **Inversify Container**
```bash
npm run test
MongoConnection: Mongoose {
  connections:
...
  connect: [Function] }
```
Clean the testing code and let's move to the next section to apply the DI/IoC to almost every area of the template.
## 5. Repositofy and Service pattern for the APIs
