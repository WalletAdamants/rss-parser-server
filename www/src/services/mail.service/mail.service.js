const nodemailer = require('nodemailer');

const {
  PORT,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
  FRONTEND_APP_URL,
  BACKEND_APP_URL = 'http://localhost:4000',
} = require('../../config/config');

const TEMP_URL = 'http://localhost:' + PORT;

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, verificationToken) {
    const res = await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: 'Please confirm your registration!',
      text: '',
      html: `<h2>Please, confirm you registration by visiting</h2> <a href="${TEMP_URL}/api/auth/verify/${verificationToken}">this link</a>`,
    });

    return res;
  }
}

const mailService = new MailService();

module.exports = { mailService };
