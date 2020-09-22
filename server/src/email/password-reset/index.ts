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

const getEmail = (link: string, to: string) => ({
  from: process.env.THE_EMAIL,
  to,
  subject: 'Reset your password',
  html: template(link),
});

const transporter = nodemailer.createTransport(transport);

// eslint-disable-next-line import/prefer-default-export
export const sendResetPasswordEmail = (link: string, to: string): void => {
  transporter.verify(error => {
    if (error) {
      throw new Error(error.message);
    } else {
      transporter.sendMail(getEmail(link, to), (err, data) => {
        if (err) {
          throw new Error(error.message);
        }
        return data;
      });
    }
  });
};
