import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const homePath: string = require("swagger-ui-dist").getAbsoluteFSPath();
const defaultHandler: express.Handler = express.static(homePath);
let indexHtml: string;

export function RegisterSwaggerUI(app: express.Application, route: string, swaggerExportDir: string) {
    app.use(route, requestHandler);
    app.use(route + '/swagger.json', (req, res) => {
        res.sendFile(path.join(swaggerExportDir, 'swagger.json'));
    });
}

function sendIndex(res: express.Response): void {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(indexHtml);
    res.end();
}

function requestHandler(req: express.Request, res: express.Response, next: express.NextFunction): any {
    if (req.url === '/' || req.url === '/index.html') {
        if (indexHtml) {
            sendIndex(res);
        } else {
            fs.readFile(path.join(homePath, 'index.html'), (err, data) => {
                indexHtml = data.toString().replace('http://petstore.swagger.io/v2/', '');
                sendIndex(res);
            });
        }
    }
    else
        return defaultHandler(req, res, next);
}
