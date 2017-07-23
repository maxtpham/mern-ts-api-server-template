Template for a full-featured [MERN stack](http://mern.io)/[Typescript](http://www.typescriptlang.org) & [Swagger](https://swagger.io)/[InversifyJS](http://inversify.io) APIs server with [nodemon](https://nodemon.io) to monitor for any changes in your source and automatically restart Node server
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
## 1. ExpressJS/Typescript
### Install npm packages
```bash
# Create package.json
npm init -y

# Install development tools
npm install --save-dev typescript ts-node nodemon @types/debug @types/node @types/express

# Install development libs
npm install --save express
```
### Create tsconfig.json
```bash
node ./node_modules/typescript/lib/tsc --init
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
### Start command in package.json
```json
..
"scripts": {
  "start": "./node_modules/.bin/nodemon --watch src/**/*.ts --exec .\\node_modules\\.bin\\ts-node src/app.ts"
},
..
```
### Create index.ts
```typescript
import * as express from 'express';

const app = express();
app.get('/', (req, res) => { res.send(`<b>Time:</b> ${new Date()}`); });
app.listen(3000, () => console.log('Server listening on port 3000!'));
```
### Test
```bash
npm start
chrome http://localhost:3000
```
## 2. Configuration
### Install [npm config package](https://www.npmjs.com/package/config)
```bash
npm install --save config
npm install --save-dev @types/config
```
### Create config/development.json
```json
{
    "Port": 3000 // server listen port (default to 3000 if not set)
}
```
### Create app/AppConfig.ts
```typescript
import * as c from "config";

interface IAppConfig extends c.IConfig {
    Port: number;
}

var config: IAppConfig = <IAppConfig>c;
export default config;
```
### Using the config in index.ts
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
### Test
```bash
npm start
# Edit config port to 3001 (in config/development.json)
chrome http://localhost:3000
chrome http://localhost:3001
```
## 3. [InversifyJS](https://github.com/inversify/InversifyJS#installation)
### Install packages
```bash
npm install --save inversify reflect-metadata
npm install --save-dev @types/reflect-metadata
```
### Edit tsconfig.json
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
