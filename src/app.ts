import * as express from 'express';
import config from './config/AppConfig';

const app = express();
app.get('/', (req, res) => { res.send(`<b>Time:</b> ${new Date()}`); });
app.listen(config.Port || 3000, () => console.log(`Server listening on port ${config.Port || 3000}!`));