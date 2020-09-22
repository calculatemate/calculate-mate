import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';
import config from '../config/config';
import { sendResetPasswordEmail } from '../email/password-reset';

export const getEnvironment = (): string | undefined => process.env.NODE_ENV;
export const isDev = getEnvironment() === 'development';

const BASE_URL = isDev ? 'http://localhost:5000' : 'https://calculate-mate.herokuapp.com';

class AuthController {
  static login = async (req: Request, res: Response) => {
    // Check if username and password are set
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    // Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send();
    }

    // Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    // Sing JWT, valid for 1 hour
    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });

    // Send the jwt in the response
    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    // Get parameters from the body
    const { userId, newPassword } = req.body;
    if (!(userId && newPassword)) {
      res.status(400).send();
    }
    // Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOne(userId);
    } catch (e) {
      res.status(400).send(e);
    }

    // Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    // Hash the new password and save
    user.hashPassword();
    await userRepository.save(user);

    res.status(204).send();
  };

  static resetPassword = async (req: Request, res: Response) => {
    // Get parameters from the body
    const { username } = req.body;
    if (!username) {
      res.status(400).send();
    }

    // Get user from the database
    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (e) {
      res.status(401).send('user not found');
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });

    const link = `${BASE_URL}/reset-password?userId=${user.id}&token=${token}`;

    sendResetPasswordEmail(link, username);

    res.status(204).send();
  };
}
export default AuthController;
