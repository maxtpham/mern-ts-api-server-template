import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

export default class SwaggerUI {
    private homePath: string;
    private indexHtml: string;
    private staticHandler: express.Handler;

    constructor() {
        this.homePath = require("swagger-ui-dist").getAbsoluteFSPath();
        this.staticHandler = express.static(this.homePath);
    }

    public static register(route: string, app: express.Application, swaggerExportDir: string) {
        app.use(route, SwaggerUI.handler());
        app.use(route + '/swagger.json', (req, res) => {
            res.sendFile(path.join(swaggerExportDir, 'swagger.json'));
        });
    }

    public static handler(): express.Handler {
        const obj = new SwaggerUI();
        return obj.handleCore.bind(obj);
    }

    private sendIndex(res: express.Response): void {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(this.indexHtml);
        res.end();
    }

    private handleCore(req: express.Request, res: express.Response, next: express.NextFunction): any {
        if (req.url === '/' || req.url === '/index.html') {
            if (this.indexHtml) {
                this.sendIndex(res);
            } else {
                fs.readFile(path.join(this.homePath, 'index.html'), (err, data) => {
                    this.indexHtml = data.toString().replace('http://petstore.swagger.io/v2/', '');
                    this.sendIndex(res);
                });
            }
        }
        else
            return this.staticHandler(req, res, next);
    }
}
