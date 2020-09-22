import * as nodemailer from 'nodemailer';
import template from './template';
import getSecret from '../../../secrets';

const transport = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: getSecret('email'),
    pass: getSecret('password'),
  },
};

const getEmail = (firstName: string, lastName: string, to: string) => ({
  from: process.env.THE_EMAIL,
  to,
  subject: 'Welcome to CalculateMate',
  html: template(firstName, lastName),
});

const transporter = nodemailer.createTransport(transport);

// eslint-disable-next-line import/prefer-default-export
export const sendAccountCreationEmail = (firstName: string, lastName: string, to: string) => {
  transporter.verify(error => {
    if (error) {
      throw new Error(error.message);
    } else {
      transporter.sendMail(getEmail(firstName, lastName, to), (err, data) => {
        if (err) {
          throw new Error(error.message);
        }
        return data;
      });
    }
  });
};
