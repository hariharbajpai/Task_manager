import nodemailer from 'nodemailer';

const sendEmail = async options => {
  // 1) Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define email options
  const mailOptions = {
    from: 'TaskWave <support@taskwave.com>',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  // 3) Send email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;