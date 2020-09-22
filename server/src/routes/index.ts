import { Router } from 'express';
import auth from './auth';
import user from './user';
import marksheet from './marksheet';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/marksheet', marksheet);

export default routes;
