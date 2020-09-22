// eslint-disable
import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { replace } from 'lodash';
import routes from './routes';
import logger from './logger';

// Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    const PORT = process.env.PORT || 5000;

    // Create a new express application instance
    const app = express();
    const root = replace(__dirname, 'server/src', '');
    app.use(express.static(path.join(root, 'client/build')));
    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // Set all routes from routes folder
    app.use('/api', routes);

    app.get('*', (req, res) => {
      res.sendFile(path.join(`${root}/client/build/index.html`));
    });
    app.listen(PORT, () => {
      logger.info(`Server started on port => ${PORT}`);
    });
  })
  .catch(error => logger.error(error));
